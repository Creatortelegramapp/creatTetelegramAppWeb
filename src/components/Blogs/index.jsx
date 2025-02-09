import PageTitle from "../Helpers/PageTitle";
import Layout from "../Partials/Layout";

import {getBlogs} from "../../Services/HttpServices/BlogsHttpServices.js";
import {useEffect, useState} from "react";
import {environment} from "../../environment.dev.js";

export default function Blogs() {
    const [blogsData, setBlogsData] = useState([]);

    useEffect(() => {
        async function blogsResponse() {
            const response = await getBlogs(environment.appId);
            setBlogsData(response.data.data)
        }
        blogsResponse();

    }, []);
    return (
        <Layout childrenClasses="pt-0 pb-0">
            <div className="blogs-wrapper w-full-width">
                <div className="title-bar">
                    <PageTitle
                        title="Our Blogs"
                        breadcrumb={[
                            {name: "home", path: "/"},
                            {name: "blogs", path: "/blogs"},
                        ]}
                    />
                </div>
            </div>

            <div className="w-full py-[60px] h-auto">
                <div className="container-x mx-auto">
                    <div className="w-full">
                        <div className="grid md:grid-cols-2 grid-cols-1 lg:gap-[30px] ">
                            {blogsData.map((item, index) => (
                                    <div className="w-full grid gap-5"
                                         key={index}>
                                        <div className="w-full h-[50px}">{item.title}</div>
                                        <div className='w-full h-[500px] bg-cover bg-no-repeat bg-center rounded-xl'
                                             style={{
                                                 backgroundImage: `url(${item.image_url})`
                                             }}>
                                        </div>
                                        <div>{item.description}</div>
                                    </div>
                                )
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    );
}
