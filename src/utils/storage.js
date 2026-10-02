import { INITIAL_WEBSITE_DATA } from "../data/initialWebsiteData.js";

const STORAGE_KEY_WEBSITE = "seo_lab_website_v1";
const STORAGE_KEY_USER = "seo_lab_user_progress_v1";

export function getStoredWebsite() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY_WEBSITE);
    if (raw) return JSON.parse(raw);
  } catch (e) {
    console.error("Failed to parse website from localStorage:", e);
  }
  return INITIAL_WEBSITE_DATA;
}

export function saveStoredWebsite(websiteData) {
  try {
    localStorage.setItem(STORAGE_KEY_WEBSITE, JSON.stringify(websiteData));
  } catch (e) {
    console.error("Failed to save website to localStorage:", e);
  }
}

export function resetStoredWebsite() {
  try {
    localStorage.removeItem(STORAGE_KEY_WEBSITE);
  } catch (e) {}
  return INITIAL_WEBSITE_DATA;
}

export function getStoredUserProgress() {
  const defaultUser = {
    xp: 150,
    level: 1,
    levelName: "SEO Beginner",
    completedChallenges: [],
    completedLessons: [],
    pursuedBacklinks: [],
    activityLog: [
      { id: "act-1", text: "Started SEO Practice Lab simulator", time: "Just now", type: "system" },
      { id: "act-2", text: "Pre-loaded initial project: GreenLeaf Digital Marketing", time: "1 min ago", type: "system" }
    ]
  };

  try {
    const raw = localStorage.getItem(STORAGE_KEY_USER);
    if (raw) return JSON.parse(raw);
  } catch (e) {
    console.error("Failed to load user progress:", e);
  }
  return defaultUser;
}

export function saveStoredUserProgress(userProgress) {
  try {
    localStorage.setItem(STORAGE_KEY_USER, JSON.stringify(userProgress));
  } catch (e) {
    console.error("Failed to save user progress:", e);
  }
}

// XP level calculator
export function calculateLevel(xp) {
  if (xp >= 1000) return { level: 5, name: "SEO Specialist", nextXp: 1500 };
  if (xp >= 600) return { level: 4, name: "SEO Analyst", nextXp: 1000 };
  if (xp >= 350) return { level: 3, name: "SEO Practitioner", nextXp: 600 };
  if (xp >= 150) return { level: 2, name: "SEO Explorer", nextXp: 350 };
  return { level: 1, name: "SEO Beginner", nextXp: 150 };
}
