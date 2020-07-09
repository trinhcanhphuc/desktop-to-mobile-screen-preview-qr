function getCurrentTabUrl() {
  var promise = new Promise((resolve, reject) => {
    try {
      getCurrentTab({ active: true, currentWindow: true }).then((current_tab) => {
        resolve(current_tab.url);
      });
    } catch (e) {
      reject(e);
    }
  })
  return promise;
}

function getCurrentTab() {
  var promise = new Promise((resolve, reject) => {
    try {
      queryBrowserTabs({ active: true, currentWindow: true }).then((tabs) => {
        resolve(tabs[0]);
      });
    } catch (e) {
      reject(e);
    }
  })
  return promise;
}

function queryBrowserTabs(query) {
  var promise = new Promise((resolve, reject) => {
    try {
      chrome.tabs.query(query, function (tabs) {
        resolve(tabs);
      });
    } catch (e) {
      reject(e);
    }
  });
  return promise;
}
