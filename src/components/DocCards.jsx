
import Card from'./Card.jsx';
import Staff1 from '../assets/images/Staff1.jpg'
const docs=[
  {
    id:1,
    name:'Ledion Agusholli',
    speciality:'Dental Surgery',
     text:'Precise and modern surgical dental care focused on comfort and safety.',
     img:'../assets/images/Staff1.jpg'
  },
   {
    id:2,
    name:'Ledion Agusholli',
    speciality:'Dental Surgery',
     text:'Precise and modern surgical dental care focused on comfort and safety.' ,
     img:'../assets/images/Staff1.jpg'
  },
   {
    id:3,
    name:'Ledion Agusholli',
    speciality:'Dental Surgery',
     text:'Precise and modern surgical dental care focused on comfort and safety.' ,
     img:'../assets/images/Staff1.jpg'
  }
]
const DocCards = () => {
  return (
        
      <section className= "min-h-screen mx-auto justify-center items-center  flex-wrap   mt-[60px] mb-[30px] flex-col md:flex-row">
            
              <div className="w-full mx-auto h-full ">
                <h1 className="text-center  text-[#0F766E]  text-[36px] font-bold tracking-wide">OUR SPECIALISTS</h1>
                <p className="text-center text-grey text-[20px] mb-16">
  Meet our certified and experienced medical team
</p>

<div className="flex justify-center items-center h-full flex-col flex-wrap md:flex-row gap-[170px] mt-[70px]">
 

    {docs.map(doc=>(<Card   
     key={doc.id} 
     name={doc.name} 
     speciality={doc.speciality}  
     text={doc.text}
     img={doc.img}/>))}
    </div>
 
</div>

             
      </section>
  )
}

export default DocCards;