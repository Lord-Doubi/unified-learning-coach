const fs = require('node:fs');
const vm = require('node:vm');
const assert = require('node:assert/strict');
const html = fs.readFileSync(require('node:path').join(__dirname, '../assets/antibody-question.html'), 'utf8');
const code = html.match(/<script>([\s\S]*?)<\/script>/)[1];
function element(extra = {}) {
  return Object.assign({checked:false, disabled:false, value:'', hidden:true, textContent:'', handlers:{}, addEventListener(type, handler) {this.handlers[type] = handler;}}, extra);
}
function setup(host = {}) {
  const choices = 'ABCDEF'.split('').map(value => element({value, parentElement:{textContent:value+'. Test statement'}}));
  const form = element(), reason = element(), button = element(), status = element(), fallback = element(), prompt = element();
  const selectors = {'form':form, '#antibody-reason':reason, 'button':button, '[role="status"]':status, '#antibody-fallback':fallback, '#antibody-prompt':prompt};
  const root = {querySelector: key => selectors[key], querySelectorAll: () => choices};
  const events = {};
  vm.runInNewContext(code, {document:{getElementById: () => root}, window:{openai:host, addEventListener:(key,fn) => events[key] = fn}});
  const change = i => {choices[i].checked = !choices[i].checked; choices[i].handlers.change();};
  const submit = () => form.handlers.submit({preventDefault(){}});
  return {choices,reason,button,status,fallback,prompt,change,submit,events};
}
function submittedAnswer(prompt) {
  const prefix = 'My submitted answer: ';
  const block = prompt.split('\n\n').find(part => part.startsWith(prefix));
  return JSON.parse(block.slice(prefix.length));
}
(async () => {
  const messages = [], saves = [];
  const app = setup({sendFollowUpMessage:async x => messages.push(x), setWidgetState:async x => saves.push(x)});
  assert.equal(app.button.disabled, true);
  await app.submit(); assert.equal(messages.length,0);
  app.change(1); app.change(2);
  assert.equal(app.button.disabled,false);
  app.change(5);
  assert(app.choices.slice(0,5).every(c => !c.disabled));
  assert.equal(app.choices[1].checked,true);
  assert.equal(app.choices[2].checked,true);
  assert.equal(app.choices[5].disabled,false);
  app.change(2);
  assert.equal(app.choices[2].checked,false);
  assert.equal(app.choices[5].checked,true);
  app.change(5);
  assert.equal(app.choices[1].checked,true);
  app.change(1);
  assert.equal(app.button.disabled,true);
  app.change(1); app.reason.value = 'My causal interpretation';
  app.reason.handlers.input();
  await app.submit();
  assert.equal(messages.length,1);
  assert(messages[0].prompt.includes('My causal interpretation'));
  assert.deepEqual(submittedAnswer(messages[0].prompt).selections, ['B']);
  assert.equal(submittedAnswer(messages[0].prompt).uncertain, false);
  assert.equal(saves.at(-1).modelContent.reasoning,'My causal interpretation');
  app.change(5); await app.submit();
  assert.deepEqual(submittedAnswer(messages[1].prompt).selections, ['B']);
  assert.equal(submittedAnswer(messages[1].prompt).uncertain, true);
  const uncertainOnly = setup(); uncertainOnly.change(5); await uncertainOnly.submit();
  assert.equal(uncertainOnly.fallback.hidden,false);
  assert.deepEqual(submittedAnswer(uncertainOnly.prompt.value).selections, []);
  assert.equal(submittedAnswer(uncertainOnly.prompt.value).uncertain, true);
  const fallback = setup(); fallback.change(0); await fallback.submit();
  assert.equal(fallback.fallback.hidden,false);
  assert(fallback.prompt.value.includes('"selections":["A"]'));
  const failed = setup({sendFollowUpMessage:async () => {throw Error('Unavailable');}});
  failed.change(1); await failed.submit(); assert.equal(failed.fallback.hidden,false);
  const restored = setup({widgetState:{modelContent:{questionId:'antibody-potency-v1',selections:['A','F'],reasoning:'Saved'}}});
  assert.equal(restored.reason.value,'Saved');
  assert.equal(restored.choices[0].checked,true);
  assert.equal(restored.choices[0].disabled,false);
  assert.equal(restored.choices[5].checked,true);
  restored.events['openai:set_globals']({detail:{globals:{widgetState:{modelContent:{questionId:'antibody-potency-v1',selections:['E'],reasoning:'Restored'}}}}});
  assert.equal(restored.choices[4].checked,true);
  assert.equal(restored.choices[5].checked,false);
  assert(!html.includes('Correct selections:'));
  console.log('PASS: uncertainty preserves answers, submissions carry confidence separately, handoff and fallback work, saved drafts restore, and no answer key is displayed.');
})().catch(error => {console.error(error); process.exitCode = 1;});
