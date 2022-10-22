"use strict";

import Data from '../Data.json' assert {type:'json'};


const resumedata=Data["resume"];
const searchset=["software engineer","manager","hr"];

//please use the following details for login
localStorage.setItem("username","harminder");
localStorage.setItem("password","1234");

const container=document.querySelector(".container");
const username=document.querySelector('.username');
const password=document.querySelector('.password');
const loginbtn=document.querySelector('.loginbtn');
const errorlogin=document.querySelector('.errorlogin');
const serachresume=document.querySelector('.serachresume');
const loginbody=document.querySelector('.loginbody');
const prev=document.querySelector(".prev");
const next=document.querySelector(".next");
const inputsec=document.querySelector(".inputsec");
const welcomesection=document.querySelector(".welcomesection");
const resume=document.querySelector(".resume");


var currentpage=0;
var totalpage=0;
var resultsearch="";
var currentdata=null;
var appliedfor="";
loginbtn.addEventListener('click',(e)=>{
          e.preventDefault();
          
          if(username.value.toLowerCase().trim()===localStorage.getItem("username") && password.value.trim()===localStorage.getItem("password"))
          {
            username.value="";
            password.value="";
            errorlogin.style.display='none';
            container.classList.add("hide");
            loginbody.classList.add("hide");
            serachresume.classList.remove("hide");
            serachresume.style.display="flex";
        

            
          }
          else
          {
            errorlogin.style.display='block';
          }
          
         
         
});

const showpagebtn=()=>{
  console.log("button show");
   if(totalpage > 1)
   {
      if(currentpage == totalpage)
      {
          prev.classList.remove("hidden");
          next.classList.add("hidden");
      }
      else if(currentpage == 1)
      {
        next.classList.remove("hidden");
        prev.classList.add("hidden");
      }
      else if(currentpage > 1)
      {
        prev.classList.remove("hidden");
        next.classList.remove("hidden");
      }
   }
}

const showpage=()=>{
   var cdata= currentdata[currentpage-1];
   console.log(cdata);
   resume.innerHTML="";
   resume.innerHTML=`
   
   <div class="resumehead">
                <div class="info">
                    <h1>${cdata["basics"]["name"]}</h1>
                    <p>Applied for : ${cdata["basics"]["AppliedFor"]}</p>
                </div>
              
                 <img src="../images/avatar.png" alt="My image">
            </div>
            <div class="resumebody">
               <div class="leftsec">
                  
                        <ul class="personalinfo">
                            <h2>Personal information</h2>
                            <li>${cdata["basics"]["email"]}</li>
                            <li>${cdata["basics"]["phone"]}</li>
                            <li> <a href="#">LinkedIn</a></li>
                        </ul>

               

                      
                        <ul class="techskills">
                            <h2>Technical skills</h2>
                         
                        </ul>
                 

                      
                        <ul class="hobbies">
                            <h2>Hobbies</h2>
                       
                       
                        </ul>
              </div>
               <div class="rightsec">
                   <h2>Work Experience in Previous Company</h2>
                       <p><b>Company Name : </b> <span class="compname">${cdata["work"]["Company Name"]}</span></p>
                       <p><b>Position : </b> <span class="position">${cdata["work"]["Position"]}</span></p>
                       <p><b>Start Date : </b> <span class="startdate">${cdata["work"]["Start Date"]}</span></p>
                       <p><b>End date : </b> <span class="enddate">${cdata["work"]["End Date"]}</span></p>
                       <p><b>Summary : </b> <span class="summary">${cdata["work"]["Summary"]}</span></p>
                   <h2>Projects</h2>
                   <p><b>${cdata["projects"]["name"]} : </b> <span class="project">${cdata["projects"]["description"]}</span></p>
                   <h2>Education</h2>
                   <p><b>UG : </b> <span class="ug">${cdata["education"]["UG"]["institute"]}</span>,<span class="ug">${cdata["education"]["UG"]["course"]}</span>,<span class="ug">${cdata["education"]["UG"]["Start Date"]}</span>,<span class="ug">${cdata["education"]["UG"]["End Date"]}</span>,<span class="ug">${cdata["education"]["UG"]["Summary"]}</span></p>
                   <p><b>PU : </b> <span class="pu">${cdata['education']["Senior Secondary"]["institute"]}</span>, <span class="pu">${cdata['education']["Senior Secondary"]["cgpa"]}</span></p>
                   <h2>Internship</h2>
                   <p><b>Company Name : </b> <span class="compname">${cdata["Internship"]["Company Name"]}</span></p>
                   <p><b>Position : </b> <span class="position">${cdata["Internship"]["Position"]}</span></p>
                   <p><b>Start Date : </b> <span class="startdate">${cdata["Internship"]["Start Date"]}</span></p>
                   <p><b>End date : </b> <span class="enddate">${cdata["Internship"]["End Date"]}</span></p>
                   <p><b>Summary : </b> <span class="summary">${cdata["Internship"]["Summary"]}</span></p>
                   <h2>Achievments</h2>
                   <p><span class="achievment">${cdata["achievements"]["Summary"]}</span></p>
                </div>
            </div>

   
   `
 const techskills=document.querySelector(".techskills");
 const hobbies=document.querySelector(".hobbies");


   cdata["skills"]["keywords"].map(ele=>{
      var s=`
      <li>${ele}</li>
      `
      techskills.insertAdjacentHTML('afterend',s); 
   })

   cdata["interests"]["hobbies"].map(ele=>{
    var s=`
    <li>${ele}</li>
    `
    hobbies.insertAdjacentHTML('afterend',s); 
 })

}

next.addEventListener("click",()=>{
   currentpage=Math.min(++currentpage,totalpage);
   showpagebtn();
   showpage();
})

prev.addEventListener("click",()=>{
   currentpage=Math.max(1,--currentpage);
   showpagebtn();
   showpage();

})

inputsec.addEventListener('focus',()=>{
    window.addEventListener("keypress",(e)=>{
          
            if(e.keyCode===13)
            {
              prev.classList.add("hidden");
              
              next.classList.add("hidden");

              resultsearch=inputsec.value.toLowerCase();

              const checkexist=searchset.find(item=>item===resultsearch);

              if(checkexist!==undefined)
              {
              
                const searchdata= resumedata.filter(ele=>ele['basics']['AppliedFor'].toLocaleLowerCase()===resultsearch);
  
                 
              
                 
                  appliedfor = searchdata[0]["basics"]["AppliedFor"].split(" ").map(ele=>ele[0].toUpperCase()+ele.substring(1)).join(" ");
                  currentdata=searchdata;
                  welcomesection.classList.add("hide");
                  resume.classList.remove("hide");
                  totalpage=searchdata.length;
                  currentpage=1;
                  showpagebtn();
                  showpage();
                 
                


              }
              

              else 
              {
              
                if(!prev.classList.contains("hidden"))
                {
                  prev.classList.add("hidden");
                }
               
                if(!next.classList.contains("hidden"))
                {
                  next.classList.add("hidden");
                }
                resume.classList.add("hide");
                welcomesection.classList.remove("hide");
                welcomesection.innerHTML="";
                welcomesection.innerHTML="<h1 > No result found!!! <span> 😞 </span></h1>";
              

              }
              
            }

    })
})