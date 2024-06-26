import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Image } from "@yext/pages-components";
import { LexicalRichText } from "@yext/pages-components";
import * as React from "react";

type TeamProps = {
  teamName: string;
  teamDescription?: any;
  teamMembersData: any[];
};

export default function TeamCarousel({
  teamName,
  teamDescription,
  teamMembersData,
}: TeamProps) {
  const settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    initialSlide: 0,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 1,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };
  return (
    <div>
      <div className="mx-auto px-8 py-16">
        <div className="mx-auto max-w-5xl text-center">
          <h2 className="text-3xl tracking-tight headColor sm:text-4xl ">
            {teamName}
          </h2>
          {teamDescription && (
            <LexicalRichText
              serializedAST={JSON.stringify(teamDescription.json)}
            ></LexicalRichText>
          )}
        </div>
        <Slider {...settings}>
          {teamMembersData &&
            teamMembersData.map((person: any, index: any) => (
              <div key={index} className="  bg-white">
                {person.photoGallery ? (
                  <img
                    className="aspect-[3/2] w-full object-cover"
                    src={person.photoGallery[0].image.url}
                    alt=""
                  />
                ) : (
                  <img
                    className="aspect-[3/2] w-full  object-cover"
                    src={`https://www.shutterstock.com/image-vector/vector-design-avatar-dummy-sign-600nw-1290556063.jpg`}
                    alt=""
                  />
                )}
                <div className="p-4">
                  <h3 className="mt-6 text-sm font-semibold leading-8 tracking-tight text-gray-900">
                    {person.name.split("-")[0]}
                  </h3>
                  <p className="text-base leading-7 text-gray-600">
                    {person.c_jobTitle || person.name.split("-")[1]}
                  </p>
                  <ul role="list" className="mt-6 flex gap-x-6">
                    <li>
                      <a href="#" className="text-gray-400 hover:text-gray-500">
                        <span className="sr-only">X</span>
                        <svg
                          className="h-5 w-5"
                          aria-hidden="true"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path d="M11.4678 8.77491L17.2961 2H15.915L10.8543 7.88256L6.81232 2H2.15039L8.26263 10.8955L2.15039 18H3.53159L8.87581 11.7878L13.1444 18H17.8063L11.4675 8.77491H11.4678ZM9.57608 10.9738L8.95678 10.0881L4.02925 3.03974H6.15068L10.1273 8.72795L10.7466 9.61374L15.9156 17.0075H13.7942L9.57608 10.9742V10.9738Z" />
                        </svg>
                      </a>
                    </li>
                    <li>
                      <a href="#" className="text-gray-400 hover:text-gray-500">
                        <span className="sr-only">LinkedIn</span>
                        <svg
                          className="h-5 w-5"
                          aria-hidden="true"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path
                            fillRule="evenodd"
                            d="M16.338 16.338H13.67V12.16c0-.995-.017-2.277-1.387-2.277-1.39 0-1.601 1.086-1.601 2.207v4.248H8.014v-8.59h2.559v1.174h.037c.356-.675 1.227-1.387 2.526-1.387 2.703 0 3.203 1.778 3.203 4.092v4.711zM5.005 6.575a1.548 1.548 0 11-.003-3.096 1.548 1.548 0 01.003 3.096zm-1.337 9.763H6.34v-8.59H3.667v8.59zM17.668 1H2.328C1.595 1 1 1.581 1 2.298v15.403C1 18.418 1.595 19 2.328 19h15.34c.734 0 1.332-.582 1.332-1.299V2.298C19 1.581 18.402 1 17.668 1z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            ))}
        </Slider>
      </div>
    </div>
  );
}
