import { computed, ref } from "vue";
import { betaLessonCatalog, courseSteps, defaultBetaLesson, defaultScienceThemeKey, scienceThemeLessons, scienceThemes } from "../../data/pookData";

export function createPookCourseController({ navigateTo, showToast, startLesson }) {
  const courseStepIndex = ref(0);
  const selectedAge = ref(5);
  const coursePath = ref([]);
  const selectedScienceTheme = ref(defaultScienceThemeKey);
  const selectedLesson = ref(defaultBetaLesson);
  const isReturningStudent = ref(true);

  const courseStep = computed(() => courseSteps[courseStepIndex.value]);
  const scienceThemeTabs = computed(() => scienceThemes);
  const activeScienceTheme = computed(
    () => scienceThemes.find((theme) => theme.key === selectedScienceTheme.value) ?? scienceThemes[0],
  );
  const courseBreadcrumb = computed(() => {
    if (courseStep.value?.isAgeKitStep) return `${selectedAge.value}岁+`;
    return courseStep.value?.breadcrumb ?? "课程中心";
  });
  const courseOptions = computed(() => {
    if (!courseStep.value) return [];
    if (courseStep.value.isScienceThemeStep) {
      return (scienceThemeLessons[selectedScienceTheme.value] ?? []).map((option, index) => ({
        ...option,
        unlocked: index === 0,
        latestUnlocked: index === 0,
      }));
    }
    if (!courseStep.value.isAgeKitStep) return courseStep.value.options;
    const suffix =
      selectedAge.value === 5
        ? "基础观察和表达"
        : selectedAge.value === 8
          ? "协作推理和结构挑战"
          : "项目制创造和编程拓展";
    const names = ["积木", "3D 打印", "绘本"];
    return courseStep.value.options.map((option, index) => ({
      ...option,
      desc: `${selectedAge.value}岁+ 推荐：${names[index]} · ${suffix}`,
    }));
  });
  const currentLesson = computed(() => selectedLesson.value ?? defaultBetaLesson);

  function setCourseAge(age) {
    selectedAge.value = Number(age);
  }

  function setScienceTheme(themeKey) {
    if (!scienceThemes.some((theme) => theme.key === themeKey)) return;
    selectedScienceTheme.value = themeKey;
  }

  function resetSelection() {
    courseStepIndex.value = 0;
    selectedScienceTheme.value = defaultScienceThemeKey;
  }

  function startBetaLessonByTheme(themeKey, lessonIndex = 0) {
    const lessons = scienceThemeLessons[themeKey] ?? [];
    const lesson = lessons[lessonIndex];
    if (!lesson) return;
    selectedScienceTheme.value = themeKey;
    selectedLesson.value = betaLessonCatalog[lesson.label] ?? {
      ...defaultBetaLesson,
      title: lesson.label,
    };
    startLesson();
    navigateTo("meet");
  }

  function selectCourseOption(index) {
    const step = courseStep.value;
    if (!step) return;

    if (step.isLessonStep) {
      const lesson = courseOptions.value[index];
      if (step.isScienceThemeStep && !lesson?.unlocked) {
        showToast("请先选择当前已经解锁的课程");
        return;
      }
      if (!lesson) return;
      selectedLesson.value = betaLessonCatalog[lesson.label] ?? {
        ...defaultBetaLesson,
        title: lesson.label,
      };
      startLesson();
      navigateTo("meet");
      return;
    }

    coursePath.value.push(step.options[index].label);
    if (courseSteps[courseStepIndex.value + 1]?.isScienceThemeStep) {
      selectedScienceTheme.value = defaultScienceThemeKey;
    }
    courseStepIndex.value = Math.min(courseStepIndex.value + 1, courseSteps.length - 1);
  }

  function goCourseBack() {
    if (courseStepIndex.value === 0) return;
    if (courseStep.value?.isScienceThemeStep) {
      selectedScienceTheme.value = defaultScienceThemeKey;
    }
    courseStepIndex.value -= 1;
    coursePath.value.pop();
  }

  return {
    courseStepIndex,
    selectedAge,
    courseStep,
    courseBreadcrumb,
    courseOptions,
    scienceThemeTabs,
    selectedScienceTheme,
    activeScienceTheme,
    currentLesson,
    isReturningStudent,
    setCourseAge,
    setScienceTheme,
    startBetaLessonByTheme,
    selectCourseOption,
    goCourseBack,
    resetSelection,
  };
}
