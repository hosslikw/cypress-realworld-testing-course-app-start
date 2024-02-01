import { find, findIndex, get, gte } from "lodash/fp"

export const getAllLessons = (coursesJson: object, lessonPath) => {
  const [sectionSlug] = lessonPath.split("/")
  const course = getCourse(coursesJson, sectionSlug)
  return get("lessons", course)
}

export const findLesson = (coursesJson: object, lessonPath: string) => {
  const [, lessonSlug] = lessonPath.split("/")
  const lessons = getAllLessons(coursesJson, lessonPath)
  return find({ slug: lessonSlug }, lessons)
}

export const getChallenge = (
  coursesJson: object,
  lessonPath: string,
  challengeIndex: number
) => {
  const lesson = findLesson(coursesJson, lessonPath)
  return lesson.challenges[challengeIndex]
}

export const getLessonIndex = (coursesJson: object, lessonPath: string) => {
  const [, lessonSlug] = lessonPath.split("/")
  const lessons = getAllLessons(coursesJson, lessonPath)
  return findIndex({ slug: lessonSlug }, lessons)
}

export const getCourse = (coursesJson: object, lessonPath: string) => {
  const [sectionSlug] = lessonPath.split("/")
  return coursesJson[sectionSlug]
}

// Assumes `lessons` is an array of lesson objects with `id` and `status`
export const isLessonCompleted = (lessons, lessonPath) => {
  const lesson = lessons.find(lesson => lesson.id === lessonPath);
  return lesson?.status === "completed";
};

export const isSectionCompleted = (sectionsCompleted, sectionSlug) => {
  return sectionsCompleted.includes(sectionSlug)
}
