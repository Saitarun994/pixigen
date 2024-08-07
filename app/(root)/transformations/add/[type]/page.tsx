import Header from '@/components/shared/Header'
import React from 'react'
import { transformationTypes } from '@/constants'
import TransformationForm from '@/components/shared/TransformationForm';
import { auth } from '@clerk/nextjs/server';
import { getUserById } from '@/lib/actions/user.actions';
import { redirect } from 'next/navigation';

/*
  Summary:
  The AddTransformationTypePage component is designed to dynamically generate a page header
  based on a transformation type passed through route parameters. It utilizes predefined 
  transformation types to set the title and subtitle of the Header component.
*/


// This 'type' corresponds to a dynamic segment of the URL that indicates which transformation type to display.
async function AddTrasnformationTypePage({params: {type}}: SearchParamProps) {
  // Getting the userId from clerk then fetching from mongodb
  const {userId} = auth();
  
  if(!userId) redirect('sign-in');
  const user = await getUserById(userId);
  // This 'type' key is derived from the URL, allowing dynamic content rendering based on the route.
  const transformation = transformationTypes[type];

  return (
    <>
      <Header 
        title={transformation.title}
        subtitle={transformation.subTitle}
      />

      <TransformationForm
        action="Add"
        userId={user._id} // This is the real id of the user in mongodb
        type={transformation.type as TransformationTypeKey}
        creditBalance={user.creditBalance} // real credit balance from mongodb
      />
    </>
    
  )
}

export default AddTrasnformationTypePage
