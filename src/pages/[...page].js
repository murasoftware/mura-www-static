import React from 'react';
import { useRouter } from 'next/router';
import { setMuraConfig, MainLayout, MuraJSRefPlaceholder, getMuraProps, getRootPath, getMuraPaths, getSiteName } from '@murasoftware/next-core';
import ErrorPage from 'next/error';
import Body from '../components/Body';
import muraConfig from 'mura.config';
import Head from '@components/Head';

export async function getStaticPaths() {
  setMuraConfig(muraConfig);
  const paths = await getMuraPaths();

  return {
    paths,
    fallback: true,
  };
}

export async function getStaticProps(context) {
  try{
    setMuraConfig(muraConfig);
    const props = await getMuraProps(context,false,{expand:'categoryassignments'});
    return props;
  } catch (e){
    console.error(e);
    const props={};
    return props;
  }
}

export default function Page(props) {
  setMuraConfig(muraConfig);
  /*
   When in a route not defined in static routes it's intitially missing props
  */
   if(!props.content){
    return '';
  }

  const router = useRouter();
  /*
   When in a route not defined in static routes it's intitially missing props
  */
 
  const {
    content = {},
    content: { displayregions } = {},
    content: {
      displayregions: { primarycontent,footer,header } = {},
    },
    moduleStyleData,
    queryParams = {}
  } = props;

  if(!content){
    return <ErrorPage statusCode="500" />
  } else if (content && typeof content.statusCode != 'undefined' && content.statusCode != 200){
    return <ErrorPage statusCode={content.statusCode} />
  } else if(content.isnew && !content.redirect){
    return <ErrorPage statusCode="404" />
  } else {

    return (
      <MainLayout {...props} route={`/${router.query.page}`}>  
         <Head            
            content={content}
            getSiteName={getSiteName}
            MuraJSRefPlaceholder={MuraJSRefPlaceholder}
            getRootPath={getRootPath}
            codeblocks={props.codeblocks}
          />
        <div dangerouslySetInnerHTML={{__html:props.codeblocks.header}}/>
        <div dangerouslySetInnerHTML={{__html:props.codeblocks.bodystart}}/>
        <Body
          content={content}
          moduleStyleData={moduleStyleData}
          header={header}
          primarycontent={primarycontent}
          footer={footer}
          displayregions={displayregions}
          props={props}
          queryParams={queryParams}
        />
        <div dangerouslySetInnerHTML={{__html:props.codeblocks.footer}}/>
        {/*
          <div className="mura-object" data-object='cookie_consent' data-statsid='cookie_consent' data-width='md'/>
        */}
      </MainLayout>
    );
  }
}
