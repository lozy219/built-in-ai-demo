let session;

const toFurigana = async (word) => {
  if (!session) {
    session = await this.ai.createTextSession({temperature: 0.1, topK: 1});
  }
  try {
    return await session.prompt(`write the IPA transcription of the word: "${word}"`);
  } catch {
    return toFurigana(session, word);
  }
}

chrome.runtime.onConnect.addListener(port => {
  port.onMessage.addListener(async message => {
    if (this.ai && (await this.ai.canCreateTextSession()) === 'readily') {
      const tokens = message.split(' ');
      let results = [];
      for (let token of tokens) {
        results.push([token, (await toFurigana(token)).trim()]);
      }
      port.postMessage(results);
    }
  });
});
