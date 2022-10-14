import React from 'react';
import { useRouter } from 'next/router';
import Page from '../[...page]';
import { EditLayout, setMuraConfig, getMuraProps } from '@murasoftware/next-core';
import muraConfig from 'mura.config';

export async function getServerSideProps(context) {

  try{
    setMuraConfig(muraConfig);
    
    const Mura=getMura(context);
    
    return getMuraProps(
      {
        context:context,
        Mura:Mura,
        renderMode:'dynamic',
        params: {
            expand:'categoryassignments'
        }
      }
    );

    } catch(e){
      console.log(e);
      return {
        props:{}
      };
    }
}

function Edit(props) {
  return (
    <EditLayout {...props}>
      <Page {...props} route={`/${router.query.page}`} />
    </EditLayout>
  );
}

export default Edit;