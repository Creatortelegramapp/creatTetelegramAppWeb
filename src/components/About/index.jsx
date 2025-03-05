import {useEffect, useState} from "react";
import { Link } from "react-router-dom";
import PageTitle from "../Helpers/PageTitle";
import Layout from "../Partials/Layout";
import {getAboutPages} from "../../Services/HttpServices/AboutHttpServices.js";
import {environment} from "../../environment.dev.js";

export default function About() {

  const [aboutData,setAboutData] = useState([]);
  useEffect(() => {
     async function  getAboutData() {
        const  response =   await getAboutPages(environment.appId);
       setAboutData(response.data.data)
    }
    getAboutData();
  }, []);

  return (
    <Layout childrenClasses="pt-0 pb-0">
      <div className="about-page-wrapper w-full">
        <div className="title-area w-full">
          <PageTitle
            title="About Us"
            breadcrumb={[
              { name: "home", path: "/" },
              { name: "About us", path: "/about" },
            ]}
          />
        </div>

        <div className="aboutus-wrapper w-full">
          <div className="container-x mx-auto">
            <div className="w-full min-h-[665px] lg:flex lg:space-x-12 items-center pb-10 lg:pb-0">
              <div className="md:w-[570px] w-full md:h-[560px] h-auto rounded overflow-hidden my-5 lg:my-0">
                <img src={aboutData.image_url}
                     alt="About" className="w-full h-auto"
                />
              </div>
              <div className="content flex-1">
                <h1 className="text-[18px] font-medium text-qblack mb-2.5">
                  {aboutData.title}
                </h1>
                <p className="text-[15px] text-qgraytwo leading-7 mb-2.5">
                  {aboutData.description}
                </p>
                <Link to="/contact">
                  <div className="w-[121px] h-10">
                    <span className="yellow-btn">Contact Us</span>
                  </div>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
