let result = "";

const log = (emoji, message) => {
  result += `${emoji} ${message} \n\n`;
  document.getElementById("result").textContent = result;
  renderMarkdown();
}

const error = message => {
  log("🔴", message);
};

const success = message => {
  log("🟢", message);
};

const info = message => {
  log("🟡", message);
};

const testSession = async (session) => {
  success("an `AILanguageModel` is created successfully.");
  const prompt = "write a sentence with all the 26 letters."
  info(`calling \`prompt("${prompt}")\` on the model...`);
  let result;
  try {
    result = await session.prompt(prompt);
  } catch (e) {
    error(`failed to get the prompt result, the exception is \`${e}\`.`);
    return;
  }
  success(`the model says: \`${result}\`.`);
}

const checkAPI = async () => {
  if (!window.ai) {
    error("`window.ai` is **not** defined.");
    return;
  }
  success("`window.ai` is defined.");

  if (!window.ai.languageModel) {
    error("`window.ai.languageModel` is **not** defined.");
    return;
  }
  success("`window.ai.languageModel` is defined.");

  info("calling `window.ai.languageModel.capabilities()`...");
  const capabilities = await window.ai.languageModel.capabilities();
  let method = capabilities.available === "no" ? error : success;
  method(`\`capabilities\` is \`${capabilities.available}\`.`);

  info("calling `window.ai.languageModel.create()`...");
  let session;
  try {
    session = await ai.languageModel.create();
  } catch (e) {
    error(`failed to create an \`AILanguageModel\`, the exception is \`${e}\`.`);
    return;
  }
  testSession(session);
}

window.onload = () => {
  checkAPI();
};