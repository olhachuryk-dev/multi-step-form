import database from "./firebaseInit";
import { get, child, ref } from "firebase/database";

export const getFieldsData = async (formId: string) => {
  const dbRef = ref(database);
  try {
    const snapshot = await get(child(dbRef, `${formId}/fields`));
    if (snapshot.exists()) {
      return snapshot.val();
    } else {
      return [];
    }
  } catch (error) {
    return error;
  }
};

export const getStepsData = async (formId: string) => {
  const dbRef = ref(database);
  try {
    const snapshot = await get(child(dbRef, `${formId}/steps`));
    if (snapshot.exists()) {
      return snapshot.val();
    } else {
      return [];
    }
  } catch (error) {
    return error;
  }
};

export const getUserAnswerData = async ({
  formId,
  userId,
}: {
  formId: string;
  userId: string;
}) => {
  const dbRef = ref(database);
  try {
    const snapshot = await get(child(dbRef, `${formId}/answers/${userId}`));
    if (snapshot.exists()) {
      return snapshot.val();
    } else {
      return [];
    }
  } catch (error) {
    return error;
  }
};

export const getAllAnswersData = async (formId: string) => {
  const dbRef = ref(database);
  try {
    const snapshot = await get(child(dbRef, `${formId}/answers`));
    if (snapshot.exists()) {
      return snapshot.val();
    } else {
      return [];
    }
  } catch (error) {
    return error;
  }
};
