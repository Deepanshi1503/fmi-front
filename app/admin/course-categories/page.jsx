import React from 'react'

const page = () => {
    return (
        <>
            {questions.length > 0 ? (
                <div className="space-y-5">

                    <div className="flex items-center flex-wrap justify-between gap-4">
                        <div className="text-2xl font-medium text-default-800 ">
                            Manage Question Banks
                        </div>
                    </div>

                    <Card>
                        <CardContent className="pt-6">
                            <div className="flex lg:flex-row flex-col flex-wrap gap-6">

                                <div className=" flex-1  flex flex-wrap gap-3">
                                    {pageView === "grid" && <div className="flex lg:flex-row flex-col w-fit flex-wrap items-center gap-2 lg:mr-2">
                                        <Input placeholder="search..." className="h-8 w-full lg:w-[250px] lg:mb-0 mb-3" />
                                    </div>
                                    }
                                    {pageView === "list" && <div className="flex lg:flex-row flex-col flex-wrap items-center gap-2 lg:mr-2">
                                        <Input
                                            placeholder="search..."
                                            value={table.getColumn("title").getFilterValue() ?? ""}
                                            onChange={(event) =>
                                                table.getColumn("title")?.setFilterValue(event.target.value)
                                            }
                                            className="h-8 w-full lg:w-[250px] lg:mb-0 mb-3"
                                        />
                                    </div>}
                                </div>

                                <div className="flex-none flex gap-3">
                                    <Button onClick={CreateQuestionBank} className="whitespace-nowrap">
                                        <Plus className="w-4 h-4  ltr:mr-2 rtl:ml-2 " />
                                        Add Question Bank
                                    </Button>

                                    <Button
                                        size="icon"
                                        variant="outline"
                                        className={cn("hover:bg-transparent  ", {
                                            "hover:border-primary hover:text-primary":
                                                pageView === "grid",
                                            "hover:border-muted-foreground hover:text-muted-foreground":
                                                pageView !== "grid",
                                        })}
                                        color={pageView === "grid" ? "primary" : "secondary"}
                                        onClick={() => setPageView("grid")}
                                    >
                                        <LayoutGrid className="h-5 w-5" />
                                    </Button>
                                    <Button
                                        size="icon"
                                        variant="outline"
                                        className={cn("hover:bg-transparent  ", {
                                            "hover:border-primary hover:text-primary":
                                                pageView === "list",
                                            "hover:border-muted-foreground hover:text-muted-foreground":
                                                pageView !== "list",
                                        })}
                                        color={pageView === "list" ? "primary" : "secondary"}
                                        onClick={() => setPageView("list")}
                                    >
                                        <List className="h-5 w-5" />
                                    </Button>
                                </div>

                            </div>
                        </CardContent>
                    </Card>
                    {pageView === "grid" && (
                        <div className="grid  xl:grid-cols-3 lg:grid-cols-2 grid-cols-1 gap-5">
                            {questions?.map((question, i) => (
                                <QuestionBankGrid
                                    question={question}
                                    key={`project-grid-${i}`}
                                    onDelete={deleteQuestionBank}
                                />
                            ))}
                        </div>
                    )}
                    {pageView === "list" && (
                        <ProjectList data={questions} table={table} columns={columns} />
                    )}
                </div>
            ) : (
                <Blank className="max-w-[320px] mx-auto flex flex-col items-center justify-center h-full space-y-3">
                    <div className=" text-default-900 text-xl font-semibold">
                        No Question Bank Here
                    </div>
                    <div className=" text-sm  text-default-600 ">
                        There is no Question Bank. Create one by clicking the button below.
                    </div>
                    <div></div>
                    <Button onClick={CreateQuestionBank}>
                        <Plus className="w-4 h-4 text-primary-foreground mr-2" />
                        Add Question bank
                    </Button>
                </Blank>
            )}
        </>
    )
}

export default page