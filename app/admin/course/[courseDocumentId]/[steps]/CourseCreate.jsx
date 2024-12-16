"use client";
import React, { useEffect, useState } from "react";
import { Stepper, Step, StepLabel } from "@/components/ui/steps";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import CourseLandingPage from './CourseLandingPage'
import CourseModulePage from './CourseModulePages'
import CourseInstructorPage from './CourseInstructor'
import CourseAccessRole from './CourseAccessRole'
import { useRouter, useSearchParams } from "next/navigation";
import axiosInstance from "@/config/axios.config";
import LayoutLoader from "@/components/layout-loader";

const CreateCourse = ({ params }) => {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(true)
  const [activeStep, setActiveStep] = React.useState(0);
  const [course, setCourse] = useState()
  const steps = [
    {
      label: "Course Details",
      content: "Set up your course details.",
    },
    {
      label: "Course Content",
      content: "Add information about your module topics.",
    },
    {
      label: "Trainers",
      content: "Add details about your course Trainers.",
    },
    {
      label: "Publishing & Access",
      content: "Manage access roles for your course.",
    },
  ]

  const isStepOptional = (step) => {
    return step === 1;
  };

  const handleNext = (courseId) => {
    router.push(`/admin/course/${courseId}/${activeStep + 2}`)
  };

  const handleBack = (courseId) => {
    router.push(`/admin/course/${courseId}/${activeStep}`)
  };

  const handleReset = () => {
    setActiveStep(0);

  };
  const generateQuery = (obj) => {
    const params = new URLSearchParams({
      "populate[0]": "course_tags",
      "populate[1]": "course_thumbnail",
      "populate[2]": "course_intro_video",
      "populate[3]": "modules.topics",
      "populate[4]": "modules.topics.videos",
      "populate[5]": "modules.topics.files",
      "populate[6]": "modules.topics.audios",
      "populate[7]": "modules.topics.images",
      "populate[8]": "modules.videos",
      "populate[9]": "modules.files",
      "populate[10]": "modules.audios",
      "populate[11]": "modules.images",
      "populate[11]": "instructors",
      "populate[12]": "departments",
      "populate[13]": "locations",
      "populate[14]": "courses_categories",
      "populate[15]": "highlights",
      "populate[16]": "roles",
      status: "draft"
    });
    return params.toString();
  };

  const validateDocumentId = async () => {
    try {
      const { data } = await axiosInstance({
        url: `/api/courses/${params.courseDocumentId}?${generateQuery()}`,
        method: 'GET'
      })
      setCourse(data.data)
      setActiveStep(parseInt(params.steps) - 1)
      setIsLoading(false)
    } catch (error) {
      console.log(error)
      router.replace('/admin/course/new/1')
    }
  }

  useEffect(() => {
    if (params.courseDocumentId === 'new') {
      if (parseInt(params.steps) !== 1)
        router.replace('/admin/course/new/1')
      else {
        setActiveStep(0)
        setIsLoading(false)
      }
    } else if (parseInt(params.steps) < 1 && parseInt(params.steps) > 3) {
      router.replace('/admin/course/new/1')
    } else {
      validateDocumentId()
    }
  }, [])

  return (
    <>
      <div className="space-y-6">
        <div className="flex items-center flex-wrap justify-between gap-4">
          <div className="text-2xl font-medium text-default-800 ">
            {course?.title || 'Create Course'}
          </div>
        </div>
        <div>
          {isLoading ?
            <LayoutLoader />
            : <div className="grid grid-cols-12">
              {activeStep === steps.length ? (
                <React.Fragment>
                  <div className="mt-2 mb-2 font-semibold text-center">
                    All steps completed - you&apos;re finished
                  </div>
                  <div className="flex pt-2">
                    <div className=" flex-1" />
                    <Button
                      size="xs"
                      variant="outline"
                      color="destructive"
                      className="cursor-pointer"
                      onClick={handleReset}
                    >
                      Reset
                    </Button>
                  </div>
                </React.Fragment>
              ) : (
                <React.Fragment>
                  {activeStep === 0 && <CourseLandingPage backButtonHidden={true} handleNext={handleNext} course={course} />}
                  {activeStep === 1 && <CourseModulePage backButtonHidden={true} courseId={course.documentId} course={course} handleNext={handleNext} handleBack={handleBack} />}
                  {activeStep === 2 && <CourseInstructorPage backButtonHidden={true} courseId={course.documentId} course={course} handleNext={handleNext} handleBack={handleBack} />}
                  {activeStep === 3 && <CourseAccessRole backButtonHidden={true} courseId={course.documentId} course={course} handleBack={handleBack} />}
                  <div className="xl:col-span-3 col-span-12 px-3 courseStepsRight">
                    <Stepper current={activeStep} direction="vertical">
                      {steps.map((label, index) => {
                        const stepProps = {};
                        const labelProps = {};
                        if (isStepOptional(index)) {
                          labelProps.optional = (
                            <StepLabel variant="caption">Optional</StepLabel>
                          );
                        }
                        return (
                          <Step key={label} {...stepProps} onClick={() => { course?.documentId && router.push(`/admin/course/${course.documentId}/${index + 1}`) }} >
                            <StepLabel {...labelProps}>
                              <div className="flex flex-col">
                                <span> {label.label}</span>
                                <span> {label.content}</span>
                              </div>
                            </StepLabel>
                          </Step>
                        );
                      })}
                    </Stepper>
                  </div>
                </React.Fragment>
              )}
            </div>}
        </div>

      </div>

    </>
  );
};

export default CreateCourse;
