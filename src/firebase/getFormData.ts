import database from "./firebaseInit";
import { get, child, ref } from "firebase/database";

export const getFieldsData = async () => {
  const formId = "helga_chu";
  const dbRef = ref(database);
  try {
    const snapshot = await get(child(dbRef, `${formId}/fields`));
    if (snapshot.exists()) {
      return snapshot.val();
    } else {
      return "No data available";
    }
  } catch (error) {
    return error;
  }
};

export const getStepsData = async () => {
  const formId = "helga_chu";
  const dbRef = ref(database);
  try {
    const snapshot = await get(child(dbRef, `${formId}/steps`));
    if (snapshot.exists()) {
      return snapshot.val();
    } else {
      return "No data available";
    }
  } catch (error) {
    return error;
  }
};

export const getUserAnswerData = async () => {
  const formId = "helga_chu";
  const userId = "olhachuryk";
  const dbRef = ref(database);
  try {
    const snapshot = await get(child(dbRef, `${formId}/answers/${userId}`));
    if (snapshot.exists()) {
      return snapshot.val();
    } else {
      return "No data available";
    }
  } catch (error) {
    return error;
  }
};

export const getAllAnswersData = async () => {
  const formId = "helga_chu";
  const dbRef = ref(database);
  try {
    const snapshot = await get(child(dbRef, `${formId}/answers`));
    if (snapshot.exists()) {
      return snapshot.val();
    } else {
      return "No data available";
    }
  } catch (error) {
    return error;
  }
};
