import React from 'react';
import { OutputMarkup } from "@murasoftware/next-modules-bs4";
import { DisplayRegion } from '@murasoftware/next-core';
import { ArticleMeta } from '@murasoftware/next-modules-bs4';
import { muraConfig } from 'mura.config';

function Article({content,moduleStyleData,header,footer,displayregions}){
    return(
        <>
        {/* Article Header */}
        {content && displayregions && header &&
            <DisplayRegion
            region={header}
            moduleStyleData={moduleStyleData}
            content={content}
            muraConfig={MuraConfig}
            />
        }
        <section className="article">
            {/* Article Image */}
            <div className="container-fluid px-0 article__image">
                <img src={content.images.hero} className="hero-article img-fluid w-100" />
            </div>

            {/* Article Meta */}
            <div className="container article__meta">
                <div className="row justify-content-center">
                    <div className="col-12 col-md-10 col-lg-9 col-xl-8">
                        <ArticleMeta content={content} fields="Title,Summary,Date,Credits,Tags"  muraConfig={muraConfig}/>
                    </div>
                </div>
            </div>

            {/* Article Body */}
            <div className="container article__body">
                <div className="row justify-content-center">
                    <div className="col-12 col-md-10 col-lg-9 col-xl-8">
                        {/* <h1>{content.title}</h1> */}
                        <OutputMarkup source={content.body}  muraConfig={muraConfig}/>
                    </div>
                </div>
            </div>
        </section>

        {/* Article Footer */}
        {content && displayregions && footer &&
            <DisplayRegion
            region={footer}
            moduleStyleData={moduleStyleData}
            content={content}
            muraConfig={muraConfig}
            />
        }
        </>
    )
}

export default Article;