import React, { useEffect, useRef, useState } from 'react'
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";
import { Input } from '@/components/ui/input'
import { Textarea } from "@/components/ui/textarea";
import { Button } from '@/components/ui/button';
import { Icon } from "@iconify/react";
import Topic from './Topic'
import DeleteConfirmationDialog from "@/components/delete-confirmation-dialog";
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';
function Module({ module, index, handleSave, handleDeleteModule, accordionPrefix, handleOpenAccordian }) {
    const defaultTopicValue = {
        title: "",
        description: "",
        sequence_no: '',
        videos: [],
        audios: [],
        images: [],
        files: [],
    }
    const [textInput, setTextInput] = useState('')
    const [isEditTitle, setIsEditTitle] = useState(!module.title)
    const [shortDescriptionInput, setShortDescriptionInput] = useState('')
    const [isEditShortDescription, setIsEditShortDescription] = useState(false)
    const [courseModule, setCourseModule] = useState(module)
    const [isDeleteModelOpen, setIsDeleteModelOpen] = useState(false)
    const [openAccordionValues, setOpenAccordionValue] = useState(['topic0'])
    const inputTitleRef = useRef(null)
    const inputDescriptionRef = useRef(null)
    const handleShortDescriptionEditButton = (event) => {
        event.stopPropagation()
        setShortDescriptionInput(courseModule.short_description)
        setIsEditShortDescription(true)
        setTimeout(() => {
            inputDescriptionRef.current.focus()
        }, 0)
    }
    const handleOpenTopicAccordian = (accordianIndex) => {
        setOpenAccordionValue((old) => [...old, 'topic' + accordianIndex])
    }
    const saveModuleShortDescription = (value) => {
        const newModuleValue = { ...courseModule, short_description: value }
        setCourseModule(newModuleValue)
        setShortDescriptionInput('')
        setIsEditShortDescription(false)
        handleSave(newModuleValue, index)
    }

    const handleTitleEditButton = (event) => {
        event.stopPropagation()
        setTextInput(courseModule.title || (`Module ${index + 1}`))
        setIsEditTitle(true)
        handleOpenAccordian(index)
        setTimeout(() => {
            inputTitleRef.current.focus()
        }, 0)

    }
    const saveModuleTitle = (value) => {
        const newModuleValue = { ...courseModule, title: value || (`Module ${index + 1}`) }
        setCourseModule(newModuleValue)
        setTextInput('')
        setIsEditTitle(false)
        handleSave(newModuleValue, index)
    }

    const appendTopic = (event) => {
        if (event)
            event.stopPropagation()
        const oldTopic = courseModule?.topics || []
        const newCourseModule = { ...courseModule, topics: [...oldTopic, { ...defaultTopicValue, sequence_no: oldTopic.length + 1 }] }
        setOpenAccordionValue((old => [...old, 'topic' + oldTopic.length]))
        setCourseModule(newCourseModule)
    }
    const handleSaveTopic = (topic, topicIndex) => {
        const newCourseTopic = courseModule.topics.map((old, oldIndex) => {
            if (topicIndex === oldIndex)
                return topic
            return old
        })
        const newCourseModule = { ...courseModule, topics: newCourseTopic }
        setCourseModule(newCourseModule)
        handleSave(newCourseModule, index)
    }

    const handleDeleteTopic = (topicIndex) => {
        const newCourseTopic = courseModule.topics.filter((old, oldIndex) => topicIndex !== oldIndex)
        const newCourseModule = { ...courseModule, topics: newCourseTopic }
        setCourseModule(newCourseModule)
        handleSave(newCourseModule, index)
    }


    const handleDelete = (event) => {
        if (event)
            event.stopPropagation()
        setIsDeleteModelOpen(true)
    }

    useEffect(() => {
        if (inputTitleRef.current) {
            inputTitleRef.current.focus()
        }
    }, [])

    function handleOnDragEnd(result) {
        if (!result.destination) return;
        const newBox = Array.from(courseModule.topics);
        const [draggedItem] = newBox.splice(result.source.index, 1);
        newBox.splice(result.destination.index, 0, draggedItem);
        const newCourseModule = { ...courseModule, topics: newBox }
        setCourseModule(newCourseModule);
        handleSave(newCourseModule, index)
    }



    return (
        <>
            <DeleteConfirmationDialog
                deleteDescription={'Are You Sure For Delete Module?'}
                headingMessage={' '}
                open={isDeleteModelOpen}
                onClose={() => setIsDeleteModelOpen(false)}
                onConfirm={() => handleDeleteModule(index)}
            />
            <AccordionItem className="bg-background border-b-2 moduleAccordionBlock p-0 shadow-sm" value={accordionPrefix + index}>
                <AccordionTrigger className="space-y-1.5 px-6 py-6 mb-0 border-b border-border flex flex-row items-center topicHeading">
                    <div className="flex items-center text-xl font-medium capitalize justify-between w-full " style={{ zIndex: 999 }}>
                        <div className="flex items-center"><svg xmlns="http://www.w3.org/2000/svg" className="mr-2" width="36" height="36" viewBox="0 0 48 48"><path fill="#ffa000" d="M40 12H22l-4-4H8c-2.2 0-4 1.8-4 4v8h40v-4c0-2.2-1.8-4-4-4" /><path fill="#ffca28" d="M40 12H8c-2.2 0-4 1.8-4 4v20c0 2.2 1.8 4 4 4h32c2.2 0 4-1.8 4-4V16c0-2.2-1.8-4-4-4" /></svg>
                            <span className="lightTextModule">Module {index + 1}.&nbsp;</span>
                            {textInput || courseModule.title}
                            <div className='ml-2 flex item-center gap-2 '>
                                {!isEditTitle &&
                                    <div onClick={handleTitleEditButton} className='editIcon'><svg xmlns="http://www.w3.org/2000/svg" width="0.8em" height="0.8em" viewBox="0 0 20 20"><g fill="currentColor" fill-rule="evenodd" clipRule="evenodd"><path d="M3.944 11.79a.5.5 0 0 1 .141-.277L14.163 1.435a.5.5 0 0 1 .707 0l3.89 3.89a.5.5 0 0 1 0 .706L8.68 16.11a.5.5 0 0 1-.277.14l-4.595.706a.5.5 0 0 1-.57-.57zm.964.314l-.577 3.76l3.759-.578l9.609-9.608l-3.183-3.182z" /><path d="m15.472 8.173l-3.537-3.53l.707-.708l3.536 3.53z" /></g></svg></div>
                                }
                                <div onClick={handleDelete} className='editIcon'><svg xmlns="http://www.w3.org/2000/svg" width="0.8em" height="0.8em" viewBox="0 0 24 24"><path fill="currentColor" fill-rule="evenodd" d="m6.774 6.4l.812 13.648a.8.8 0 0 0 .798.752h7.232a.8.8 0 0 0 .798-.752L17.226 6.4zm11.655 0l-.817 13.719A2 2 0 0 1 15.616 22H8.384a2 2 0 0 1-1.996-1.881L5.571 6.4H3.5v-.7a.5.5 0 0 1 .5-.5h16a.5.5 0 0 1 .5.5v.7zM14 3a.5.5 0 0 1 .5.5v.7h-5v-.7A.5.5 0 0 1 10 3zM9.5 9h1.2l.5 9H10zm3.8 0h1.2l-.5 9h-1.2z" /></svg></div>
                            </div>
                        </div>
                        <div className='flex items-end mr-8'>
                            <Button size="icon" variant="outline" className="group" onClick={(event) => { appendTopic(event) }}>
                                <Icon icon="mynaui:plus-solid" className=" h-6 w-6 " />
                            </Button>
                        </div>
                    </div>
                </AccordionTrigger>
                <AccordionContent>

                    <div className="flex px-6 py-0 mb-6">
                        {isEditTitle && <>
                            <Input ref={inputTitleRef} type="text" placeholder={`Module Title`} size="md" value={textInput} onChange={(event) => { setTextInput(event.target.value) }} onBlur={(event) => { saveModuleTitle(event.target.value) }} onKeyPress={(event) => event.key === 'Enter' && saveModuleTitle(event.target.value)} />
                        </>}
                    </div>
                    {!isEditTitle &&
                        <>
                            {isEditShortDescription ?
                                <div className="flex ml-6 mr-6 mb-6 wp-auto"><Textarea ref={inputDescriptionRef} placeholder="Type Short Description.." rows="3" value={shortDescriptionInput} onChange={(event) => { setShortDescriptionInput(event.target.value) }} onBlur={(event) => { saveModuleShortDescription(event.target.value) }} /></div>
                                :
                                <>
                                    {courseModule.short_description ? <div className='topicHeading flex px-6 py-0 mb-6'>
                                        <p className='text-base'>
                                            {courseModule.short_description}  <svg xmlns="http://www.w3.org/2000/svg" onClick={handleShortDescriptionEditButton} className='editIcon ' width="1.2em" height="1.2em" viewBox="0 0 20 20"><g fill="currentColor" fill-rule="evenodd" clipRule="evenodd"><path d="M3.944 11.79a.5.5 0 0 1 .141-.277L14.163 1.435a.5.5 0 0 1 .707 0l3.89 3.89a.5.5 0 0 1 0 .706L8.68 16.11a.5.5 0 0 1-.277.14l-4.595.706a.5.5 0 0 1-.57-.57zm.964.314l-.577 3.76l3.759-.578l9.609-9.608l-3.183-3.182z" /><path d="m15.472 8.173l-3.537-3.53l.707-.708l3.536 3.53z" /></g></svg>
                                        </p>
                                    </div> : <div className='topicHeading flex px-6 py-0 mb-6'>
                                        <p className='text-base'>
                                            Short description ....
                                        </p>
                                        <div onClick={handleShortDescriptionEditButton} className='editIcon'>
                                            <svg xmlns="http://www.w3.org/2000/svg" width="1.2em" height="1.2em" viewBox="0 0 20 20"><g fill="currentColor" fill-rule="evenodd" clipRule="evenodd"><path d="M3.944 11.79a.5.5 0 0 1 .141-.277L14.163 1.435a.5.5 0 0 1 .707 0l3.89 3.89a.5.5 0 0 1 0 .706L8.68 16.11a.5.5 0 0 1-.277.14l-4.595.706a.5.5 0 0 1-.57-.57zm.964.314l-.577 3.76l3.759-.578l9.609-9.608l-3.183-3.182z" /><path d="m15.472 8.173l-3.537-3.53l.707-.708l3.536 3.53z" /></g></svg>
                                        </div>
                                    </div>}
                                </>
                            }

                            {courseModule?.topics?.length > 0 &&
                                <Accordion type="multiple" className="w-full px-6 py-6 mb-6 space-y-3.5 mt-4" defaultValue={['topic0']} onValueChange={(value) => { setOpenAccordionValue(value) }} value={openAccordionValues}>
                                    <DragDropContext onDragEnd={handleOnDragEnd}>
                                        <Droppable droppableId="accordion-topic" type="TOPICS">
                                            {(provided) => (
                                                <div
                                                    ref={provided.innerRef}
                                                    {...provided.droppableProps}
                                                    className="w-full space-y-3.5"
                                                >
                                                    {courseModule?.topics?.map((topic, index) => <>
                                                        <Draggable
                                                            key={`topic_${topic.sequence_no}`}
                                                            draggableId={`topic_${topic.sequence_no}`}
                                                            index={index}
                                                        >
                                                            {(provided) => (
                                                                <div
                                                                    ref={provided.innerRef}
                                                                    {...provided.draggableProps}
                                                                    {...provided.dragHandleProps}
                                                                >
                                                                    <Topic topic={topic} index={index} handleSave={handleSaveTopic} openAccordionValues={openAccordionValues} handleDeleteTopic={handleDeleteTopic} accordionPrefix={"topic"} handleOpenAccordian={handleOpenTopicAccordian} />
                                                                </div>)}
                                                        </Draggable>
                                                    </>)}
                                                    {provided.placeholder}
                                                </div>
                                            )}
                                        </Droppable>
                                    </DragDropContext>
                                </Accordion>
                            }
                        </>}
                </AccordionContent>
            </AccordionItem>
        </>
    )
}

export default Module