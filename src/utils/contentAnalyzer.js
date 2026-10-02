// Content & Keyword Analysis Helper
export function analyzeContent(content = "", focusKeyword = "", headings = { h1: "", h2s: [], h3s: [] }) {
  const cleanText = content.replace(/<[^>]*>?/gm, '');
  const words = cleanText.split(/\s+/).filter(Boolean);
  const wordCount = words.length;

  let keywordCount = 0;
  let densityPercent = 0;

  if (focusKeyword && wordCount > 0) {
    const regex = new RegExp(focusKeyword.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'gi');
    const matches = cleanText.match(regex);
    keywordCount = matches ? matches.length : 0;
    densityPercent = parseFloat(((keywordCount / wordCount) * 100).toFixed(2));
  }

  // Keyword placement checks
  const inH1 = headings.h1 ? headings.h1.toLowerCase().includes(focusKeyword.toLowerCase()) : false;
  const inFirstParagraph = words.slice(0, 50).join(' ').toLowerCase().includes(focusKeyword.toLowerCase());

  // Keyword stuffing warning (> 3.5% density)
  const isKeywordStuffed = densityPercent > 3.5;

  // Readability estimate (Flesch-Kincaid simplified estimate)
  const sentences = cleanText.split(/[.!?]+/).filter(Boolean).length || 1;
  const avgSentenceLength = Math.round(wordCount / sentences);

  let readabilityGrade = "Good";
  if (avgSentenceLength > 25) readabilityGrade = "Complex / Hard to read";
  else if (avgSentenceLength < 10) readabilityGrade = "Too Simple / Choppy";

  return {
    wordCount,
    keywordCount,
    densityPercent,
    inH1,
    inFirstParagraph,
    isKeywordStuffed,
    sentences,
    avgSentenceLength,
    readabilityGrade
  };
}
