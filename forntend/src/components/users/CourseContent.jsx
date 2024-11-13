import React, { useState, useEffect, useContext } from 'react';
import { useParams, Link } from 'react-router-dom';
import axiosInstance from '../utils/AxiosInstance.jsx';
import ReactPlayer from 'react-player';
import { UserContext } from '../../App.jsx';
import NavBar from '../utils/NavBar.jsx';
import html2canvas from "html2canvas";
import { jsPDF } from "jspdf";

const CourseContent = () => {
   const user = useContext(UserContext);
   const { courseId, courseTitle } = useParams();
   const [courseContent, setCourseContent] = useState([]);
   const [currentVideo, setCurrentVideo] = useState(null);
   const [playingSectionIndex, setPlayingSectionIndex] = useState(-1);
   const [completedSections, setCompletedSections] = useState([]);
   const [completedModule, setCompletedModule] = useState([]);
   const [showModal, setShowModal] = useState(false);
   const [certificate, setCertificate] = useState(null);

   const completedModuleIds = completedModule.map((item) => item.sectionId);

   const downloadPdfDocument = (rootElementId) => {
      const input = document.getElementById(rootElementId);
      html2canvas(input).then((canvas) => {
         const imgData = canvas.toDataURL('image/png');
         const pdf = new jsPDF();
         pdf.addImage(imgData, 'JPEG', 0, 0);
         pdf.save('download-certificate.pdf');
      });
   };

   const getCourseContent = async () => {
      try {
         const res = await axiosInstance.get(`/api/user/coursecontent/${courseId}`, {
            headers: {
               "Authorization": `Bearer ${localStorage.getItem("token")}`
            }
         });
         if (res.data.success) {
            setCourseContent(res.data.courseContent);
            setCompletedModule(res.data.completeModule);
            setCertificate(res.data.certficateData.updatedAt);
         }
      } catch (error) {
         console.log(error);
      }
   };

   useEffect(() => {
      getCourseContent();
   }, [courseId]);

   const playVideo = (videoPath, index) => {
      setCurrentVideo(videoPath);
      setPlayingSectionIndex(index);
   };

   const completeModule = async (sectionId) => {
      if (completedModule.length < courseContent.length) {
         if (playingSectionIndex !== -1 && !completedSections.includes(playingSectionIndex)) {
            setCompletedSections([...completedSections, playingSectionIndex]);
            try {
               const res = await axiosInstance.post(`api/user/completemodule`, { courseId, sectionId }, {
                  headers: {
                     Authorization: `Bearer ${localStorage.getItem('token')}`
                  }
               });
               if (res.data.success) {
                  alert(res.data.message);
                  getCourseContent();
               }
            } catch (error) {
               console.log(error);
            }
         }
      } else {
         setShowModal(true);
      }
   };

   return (
      <>
         <NavBar />
         <h1 className="my-6 text-center text-2xl font-semibold">Welcome to the course: {courseTitle}</h1>

         <div className="container mx-auto flex flex-col md:flex-row gap-8">
            {/* Course Sections */}
            <div className="w-full md:w-1/2">
               <div className="border border-gray-300 rounded-lg p-4 bg-white">
                  {courseContent.map((section, index) => {
                     const sectionId = index;
                     const isSectionCompleted = !completedModuleIds.includes(sectionId);

                     return (
                        <div key={index} className="mb-4 border-b border-gray-200 pb-4">
                           <h3 className="text-lg font-semibold">{section.S_title}</h3>
                           <p className="text-gray-700">{section.S_description}</p>
                           {section.S_content && (
                              <div className="mt-2">
                                 <button
                                    className="text-blue-500 hover:underline mr-4"
                                    onClick={() => playVideo(`http://localhost:8000${section.S_content.path}`, index)}
                                 >
                                    Play Video
                                 </button>
                                 {isSectionCompleted && !completedSections.includes(index) && (
                                    <button
                                       className={`px-4 py-1 bg-green-500 text-white rounded hover:bg-green-600 transition ${playingSectionIndex !== index ? 'opacity-50 cursor-not-allowed' : ''}`}
                                       onClick={() => completeModule(sectionId)}
                                       disabled={playingSectionIndex !== index}
                                    >
                                       Completed
                                    </button>
                                 )}
                              </div>
                           )}
                        </div>
                     );
                  })}
                  {completedModule.length === courseContent.length && (
                     <button
                        className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
                        onClick={() => setShowModal(true)}
                     >
                        Download Certificate
                     </button>
                  )}
               </div>
            </div>

            {/* Video Player */}
            <div className="w-full md:w-1/2">
               {currentVideo && (
                  <ReactPlayer
                     url={currentVideo}
                     width="100%"
                     height="100%"
                     controls
                     className="rounded-lg shadow-lg"
                  />
               )}
            </div>
         </div>

         {/* Modal */}
         {showModal && (
            <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
               <div className="bg-white rounded-lg shadow-lg max-w-lg w-full p-6">
                  <div className="flex justify-between items-center mb-4">
                     <h2 className="text-xl font-semibold">Completion Certificate</h2>
                     <button className="text-gray-500 hover:text-gray-700" onClick={() => setShowModal(false)}>
                        ✕
                     </button>
                  </div>
                  <p>Congratulations! You have completed all sections. Here is your certificate:</p>
                  <div id="certificate-download" className="text-center my-4 p-4 border border-gray-300 rounded-lg bg-gray-50">
                     <h1 className="text-2xl font-bold">Certificate of Completion</h1>
                     <div className="mt-4">
                        <p>This is to certify that</p>
                        <h2 className="text-xl font-semibold">{user.userData.name}</h2>
                        <p>has successfully completed the course</p>
                        <h3 className="text-lg font-semibold">{courseTitle}</h3>
                        <p>on</p>
                        <p className="text-gray-700">{new Date(certificate).toLocaleDateString()}</p>
                     </div>
                  </div>
                  <button
                     onClick={() => downloadPdfDocument('certificate-download')}
                     className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 float-right"
                  >
                     Download Certificate
                  </button>
               </div>
            </div>
         )}
      </>
   );
};

export default CourseContent;
