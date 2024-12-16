"use client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import ReportsSnapshot from "./components/reports-snapshot";
import WelcomeBlock from "./components/welcome-block";
import TopCustomers from "./components/top-customers";
import GradiantRadialBar from "./components/gradiant-radial-bar";
import BlueRadialBar from "./components/blue-radial-bar";
import Image from "next/image";
import admin from "@/public/images/avatar/avatar-13.jpg"
import { Badge } from "@/components/ui/badge";
import { Button } from '@/components/ui/button'
import { Progress } from "@/components/ui/progress";

const DashboardPageView = ({ trans }) => {
  return (
    <div className="space-y-6">
      {/* <div className="flex items-center flex-wrap justify-between gap-4">
        <div className="text-2xl font-medium text-default-800 ">
          Analytics {trans?.dashboard}
        </div>
        <DatePickerWithRange />
      </div> */}
      {/* reports area */}

      

      <div className="grid grid-cols-12  gap-6 ">
        <div className="col-span-12 lg:col-span-8">

          <div className="grid grid-cols-12 gap-6 pt-0 py-3 items-center">
            <div className="col-span-12 lg:col-span-6 courseHeading"><h2>Continue Learning...</h2></div>
            <div className="col-span-12 lg:col-span-6 text-end"><Button variant="ghost">Explore all 
            <svg xmlns="http://www.w3.org/2000/svg" width="2em" height="2em" viewBox="0 0 24 24"><path fill="currentColor" d="M6 12h8.25L11 8.75l.67-.75l4.5 4.5l-4.5 4.5l-.67-.75L14.25 13H6zm15 .5a9.5 9.5 0 0 1-9.5 9.5C6.26 22 2 17.75 2 12.5A9.5 9.5 0 0 1 11.5 3a9.5 9.5 0 0 1 9.5 9.5m-1 0A8.5 8.5 0 0 0 11.5 4A8.5 8.5 0 0 0 3 12.5a8.5 8.5 0 0 0 8.5 8.5a8.5 8.5 0 0 0 8.5-8.5"/></svg>
              </Button></div>
          </div>


          <div className="grid grid-cols-12 gap-6 instructorBlock">

            <div className="col-span-12 lg:col-span-4">
              <Card>
                <CardContent className="p-3 grid grid-cols-12 gap-0">
                  <div className="col-span-12 lg:col-span-12 courseLightBlueBg rounded-md">
                    <div className="w-full h-[114px] overflow-hidden"><Image src={admin} alt="user" className="rounded-md" /></div>
                      <div className="p-4">
                      <Badge className="courseBadge" color="info" variant="soft">12 Courses</Badge>
                      <h3>Piping Design Engineering & Piping Isometrics </h3>
                      <p className="py-1">Andrew Smith</p>
                      </div>
                  </div>
                  <div className="col-span-12 lg:col-span-12">
                    <p className="p-4">
                      
                    <Progress value={60}  size="sm"/>
                    <small>60%</small>
                      
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="col-span-12 lg:col-span-4">
              <Card>
                <CardContent className="p-3 grid grid-cols-12 gap-0">
                  <div className="col-span-12 lg:col-span-12 courseLightVoiletBg rounded-md">
                  <div className="w-full h-[114px] overflow-hidden"><Image src={admin} alt="user" className="rounded-md" /></div>
                    <div className="p-4">
                    <Badge className="courseBadge" color="info" variant="soft">12 Courses</Badge>
                    <h3>Maintenance Management & Reliability </h3>
                    <p className="py-1">Arijit Bhattacharya</p>
                    </div>
                  </div>
                  <div className="col-span-12 lg:col-span-12">
                    <p className="p-4">
                    <Progress value={60}  size="sm"/>
                    <small>60%</small>
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="col-span-12 lg:col-span-4">
              <Card>
                <CardContent className="p-3 grid grid-cols-12 gap-0">
                  <div className="col-span-12 lg:col-span-12 courseLightBlueBg rounded-md">
                    <div className="w-full h-[114px] overflow-hidden"><Image src={admin} alt="user" className="rounded-md" /></div>
                      <div className="p-4">
                      <Badge className="courseBadge" color="info" variant="soft">12 Courses</Badge>
                      <h3>Advanced Diploma in Design Engineering</h3>
                      <p className="py-1">Rashi Khanna</p>
                      </div>
                  </div>
                  <div className="col-span-12 lg:col-span-12">
                     <p className="p-4">
                     <Progress value={60}  size="sm"/>
                     <small>60%</small>
                     </p>
                  </div>
                </CardContent>
              </Card>
            </div>

          </div>


          <div className="grid grid-cols-12 gap-6 pt-7 py-3 items-center">
            <div className="col-span-12 lg:col-span-6 certificateeHeading"><h2>Certificates</h2></div>
            <div className="col-span-12 lg:col-span-6 text-end"><Button variant="ghost">Explore all
            <svg xmlns="http://www.w3.org/2000/svg" width="2em" height="2em" viewBox="0 0 24 24"><path fill="currentColor" d="M6 12h8.25L11 8.75l.67-.75l4.5 4.5l-4.5 4.5l-.67-.75L14.25 13H6zm15 .5a9.5 9.5 0 0 1-9.5 9.5C6.26 22 2 17.75 2 12.5A9.5 9.5 0 0 1 11.5 3a9.5 9.5 0 0 1 9.5 9.5m-1 0A8.5 8.5 0 0 0 11.5 4A8.5 8.5 0 0 0 3 12.5a8.5 8.5 0 0 0 8.5 8.5a8.5 8.5 0 0 0 8.5-8.5"/></svg>
              </Button></div>
          </div>


          <div className="grid grid-cols-12 gap-6 instructorBlock">
            <div className="col-span-12 lg:col-span-4">
              <Card>
                <CardContent className="p-3 grid grid-cols-12 gap-4">
                  <div className=" col-span-12 lg:col-span-4">
                    <Image src={admin} alt="user" className="rounded-md" />
                  </div>
                  <div className="col-span-12 lg:col-span-8">
                    <h3>Cybersecurity Basics Certificate</h3>
                    <p className="py-1">Unlocked on 12 Nov 2023</p>
                    <Button variant="soft">Download</Button>
                  </div>
                </CardContent>
              </Card>
            </div>
            <div className="col-span-12 lg:col-span-4">
              <Card>
                <CardContent className="p-3 grid grid-cols-12 gap-4">
                  <div className="col-span-12 lg:col-span-4">
                    <Image src={admin} alt="user" className="rounded-md" />
                  </div>
                  <div className="col-span-12 lg:col-span-8">
                    <h3>Practical Datascience in Python </h3>
                    <p className="py-1">Unlocked on 18 Nov 2023</p>
                    <Button variant="soft">Download</Button>
                  </div>
                </CardContent>
              </Card>
            </div>
            <div className="col-span-12 lg:col-span-4">
              <Card>
                <CardContent className="p-3 grid grid-cols-12 gap-4">
                  <div className="col-span-12 lg:col-span-4">
                    <Image src={admin} alt="user" className="rounded-md" />
                  </div>
                  <div className="col-span-12 lg:col-span-8">
                    <h3>Cybersecurity Basics Certificate</h3>
                    <p className="py-1">Data Science</p>
                    <Button variant="soft">Download</Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>


          <div className="grid grid-cols-12 gap-6 pt-5 py-3 items-center">
            <div className="col-span-12 lg:col-span-6 instructorHeading"><h2>Top Instructor</h2></div>
            <div className="col-span-12 lg:col-span-6 text-end"><Button variant="ghost">Explore all 
            <svg xmlns="http://www.w3.org/2000/svg" width="2em" height="2em" viewBox="0 0 24 24"><path fill="currentColor" d="M6 12h8.25L11 8.75l.67-.75l4.5 4.5l-4.5 4.5l-.67-.75L14.25 13H6zm15 .5a9.5 9.5 0 0 1-9.5 9.5C6.26 22 2 17.75 2 12.5A9.5 9.5 0 0 1 11.5 3a9.5 9.5 0 0 1 9.5 9.5m-1 0A8.5 8.5 0 0 0 11.5 4A8.5 8.5 0 0 0 3 12.5a8.5 8.5 0 0 0 8.5 8.5a8.5 8.5 0 0 0 8.5-8.5"/></svg>
              </Button></div>
          </div>


          <div className="grid grid-cols-12 gap-6 instructorBlock">
            <div className="col-span-12 lg:col-span-4">
              <Card>
                <CardContent className="p-3 grid grid-cols-12 gap-4">
                  <div className=" col-span-12 lg:col-span-4">
                    <Image src={admin} alt="user" className="rounded-md" />
                  </div>
                  <div className="col-span-12 lg:col-span-8">
                    <h3>Manish Bhardwaj</h3>
                    <p className="py-1">Data Science, Python, DevOps</p>
                    <Badge color="info" variant="soft">8 Courses</Badge>
                  </div>
                </CardContent>
              </Card>
            </div>
            <div className="col-span-12 lg:col-span-4">
              <Card>
                <CardContent className="p-3 grid grid-cols-12 gap-4">
                  <div className="col-span-12 lg:col-span-4">
                    <Image src={admin} alt="user" className="rounded-md" />
                  </div>
                  <div className="col-span-12 lg:col-span-8">
                    <h3>Rashi Khanna</h3>
                    <p className="py-1">Design Engineering</p>
                    <Badge color="info" variant="soft">6 Courses</Badge>
                  </div>
                </CardContent>
              </Card>
            </div>
            <div className="col-span-12 lg:col-span-4">
              <Card>
                <CardContent className="p-3 grid grid-cols-12 gap-4">
                  <div className="col-span-12 lg:col-span-4">
                    <Image src={admin} alt="user" className="rounded-md" />
                  </div>
                  <div className="col-span-12 lg:col-span-8">
                    <h3>Ashwin Kundu</h3>
                    <p className="py-1">Industrial Design</p>
                    <Badge color="info" variant="soft">12 Courses</Badge>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>


        </div>


        <div className="col-span-12 lg:col-span-4">

          <TopCustomers />

        </div>

      </div>

    </div>
  );
};

export default DashboardPageView;
