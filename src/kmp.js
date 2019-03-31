//
// 建立 pattern 的最大共同前後綴表
//
// 假設 pattern 為 ABCABA
// 建立的順序如下
// A              0
// AB             0
// ABC            0
// ABCA           1
// ABCAB          2
// ABCABA         1
//
// 主要有兩個重點：
//   1. 可以透過前一次的最大前後綴結果來推算這一次的最大前後綴長度
//      舉例來說：
//        當 'ABCA' 變成 'ABCAB' 的時候，
//        其實只是在後面多加一個 B，
//        這時候只要比較前一個的 最大共同後綴長度+1 個字(B) 和 新加入的 B 是否匹配，
//        就可以決定此輪的最大共同前後綴長度了。
//
//   2. 失配時，目前比較的 char 要再比較一次第一個 char
//      舉例來說：
//        當 'ABCAB' 變成 'ABCABA' 的時候，
//        根據第一點，比較的基準 C 和新加入的 A 發生了失配，
//        這代表與前一輪的最大共同前後綴沒有匹配，
//        但不代表這一輪沒有最大共同前後綴，
//        有可能與第一個字元 A 發生了匹配。
//
function getFailures(pattern) {
  let failures = [0];
  let i = 0
  let j = 1

  while(j < pattern.length) {
    if (pattern[i] === pattern[j]) {
      failures[j] = failures[j-1] + 1;
      i++;
    } else {
      i = 0;
      failures[j] = (pattern[i] === pattern[j]) ? 1 : 0;
    }

    j++;
  }

  return failures;
}

function kmp(str, pattern) {
  if(str.length < pattern.length) return -1;
  const failures = getFailures(pattern);                                 // 取得 failure table

  let strIdx = 0;
  while(strIdx < str.length) {                                           // 搜尋的 HEAD 尚未達到目標字串尾則繼續 loop
    for(let patternIdx = 0; patternIdx < pattern.length; patternIdx++) { // 從 HEAD 開始比較 pattern 字串
      if (strIdx + patternIdx >= str.length) return -1;                  // 超出目標字串尾則代表沒有符合

      if (str[strIdx + patternIdx] !== pattern[patternIdx]) {            // 目前 pattern 第 n 個 char 不符合 字串 HEAD + n 的 char
        let commonSufPrefixLength = failures[patternIdx - 1] || 0;       // 透過 failures 表來取得最大共同前後綴長度 (以已經匹配的 index 為基準）
        strIdx += 1 + patternIdx - commonSufPrefixLength;                // 移動 strIdx 略過失配的部分
        break;                                                           // 失配則離開 pattern 比對的 loop
      }

      if(patternIdx + 1 === pattern.length) {                           // 若 pattern 成功匹配，則回傳當前 strIdx
        return strIdx;
      }
    }
  }

  return -1;
}

exports.kmp = kmp;
