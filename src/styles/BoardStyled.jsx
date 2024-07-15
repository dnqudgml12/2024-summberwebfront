import styled from "styled-components";
import { Link } from "react-router-dom";
export const BoardInBody = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 100px;
  padding-left: 50px;
  color: #292929;
  font-size: 22px;
  font-weight: bold;
  height: auto;
`;

export const Titlediv = styled.div`
  width: 780px;
  margin-bottom: 5px;
  padding: 15px;
  border: 1px solid #d6d6d6;
  box-sizing: border-box;
`;

export const SecondInBody = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin-bottom: 5px;
  padding: 15px 0px 15px 15px;
  border: 1px solid #d6d6d6;
  box-sizing: border-box;
  width: 780px;
`;



export const FirstinSecondbody = styled.div`
  display: flex;
  flex-direction: row;
`;

export const QuestionImg = styled.img`
  margin-top: 10px;
  width: 24px;
  height: 24px;
  flex-shrink: 0;
`;
export const QuestionOne = styled.div`
  padding: 12px;
  width: auto;
  background-color: #edfffe;
  line-height: 20px;
  border-radius: 12px;
  color: #666;
  font-size: 14px;
  max-width: 240px;
  margin-left: 10px;
`;

export const PopulationImg = styled.img`
  margin-top: 10px;
  width: 24px;
  height: 24px;
  flex-shrink: 0;
`;
export const PopulationOne = styled.div`
  padding: 12px;
  width: auto;
  background-color: #fff3f3;
  line-height: 20px;
  border-radius: 12px;
  color: #444444;
  font-size: 14px;
  max-width: 240px;
  margin-left: 10px;
`;

export const Likediv = styled.img`
  line-height: 11px;
  margin-left: 5px;
  padding-left: 15px;
  color: #f91f15;
  width: 15px;
`;

export const Writedivoff = styled.div`
  display: flex;
  flex-direction: row;
  width: 780px;
  margin-bottom: 5px;
  padding: 0 10px;
  height: 50px;
  border: 2px solid #d6d6d6;
  box-sizing: border-box;
  cursor: text;
  background-color: #f9f9f9;
 
`;

export const Writecomment = styled.div`
  line-height: 46px;
  width: auto;
  color: #a6a6a6;
  font-size: 14px;
  font-weight: 400;
`;
export const Writeimg = styled.img`
  margin-left: 600px;
  margin-top: 5px;
  width: 30px;
  height: 35px;
`;

export const Formaddstyld= styled.form`
display: flex;
flex-direction: column;
  width: 780px;
  margin-bottom: 5px;
    border: 2px solid #d6d6d6 ;
    box-sizing: border-box;

    
`

export const Addtitle= styled.input`
    padding: 15px;
    border-bottom: 1px solid #e3e3e3 !important;
    background-color: #fff;
    width: 745px;
    height: 20px;
    border: 0;
    color: #292929;
    font-size: 16px;
    font-weight: bold;
    letter-spacing: -0.5px;
`

export const Addtextarea= styled.textarea`
    padding: 15px;
    border-bottom: 1px solid #e3e3e3 !important;
    background-color: #fff;
    width: 745px;
    height: 350px;
    border: 0;
    color: #292929;
    font-size: 14px;
    resize: none;
`

export const Savewrite = styled.button`
margin-left: 680px;
border: none;
text-decoration: none;
    
    width: 40px;
    height: 40px;
    cursor: pointer;
    background-color: #F91F15;
`

export const Savecancle = styled.button`
border: none;
text-decoration: none;
    margin-left: 15px;
    width: 40px;
    height: 40px;
    cursor: pointer;
    background-color: #F91F15;
`

export const Buttonimgsave= styled.img`
width: 35px;
height: 35px;
    
`

export const Buttonimgcancle= styled.img`
width: 15px;
height: 15px;
    
`

export const Eachseperateboard = styled(Link)`

display: flex;
flex-direction: column;
height: 80px;
padding: 16px 24px;
  display: block;
  text-decoration: none;

  border-top: 1px solid #e3e3e3;

  &:hover {
   cursor: pointer;
  }
`;

export const BoardTitle= styled.div`
 color: #292929;
     line-height: 20px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    font-size: 14px;
`
export const BoardContent= styled.div`

    width: auto;
    text-overflow: ellipsis;
    overflow: hidden;
    word-break: break-word;
    margin-bottom: 4px;
    max-height: 100px;
    line-height: 20px;
    white-space: normal;
    font-size: 14px;
    font-weight: 400;
    color: #444444;

`
export const BoardAlldiv= styled.div`
width: 780px;
box-sizing: border-box;
    border-bottom: 1px solid #e3e3e3;
    border-left: 1px solid #e3e3e3;
    border-right: 1px solid #e3e3e3;
    background-color: #fff;

`

//detailbox

export const SecondIndetailBody= styled.div`
    display: flex;
    flex-direction: column;
    width: 780px;
    height: auto;
    box-sizing: border-box;
    border: 1px solid #e3e3e3;
    background-color: #fff;

`

export const Imgandnameinfrom= styled.div`

display: flex;
flex-direction: row;
  width: auto;
  height: 40px;
  padding: 15px 0px 15px 15px;
  margin-bottom: 15px;
`

export const Imgpicture= styled.img`
  margin: 0 10px 15px 0;
    width: 40px;
    height: 40px;
    border-radius: 8px;

`

export const NameandTime= styled.div`
display: flex;
flex-direction: column;
  width: auto;
  height: 40px;
`
export const Names= styled.div`
      height: 20px;
    max-width: 200px;
    line-height: 20px;
    font-size: 14px;
    font-weight: bold;    color: #292929;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
`

export const Dates = styled.div`
  color: #a6a6a6;
  letter-spacing: 0;
  line-height: 20px;
    font-size: 12px;
    font-weight: 400;
`
export const DeleteandModity=styled.div`
  display: flex;
  flex-direction: row;
  width: auto;
  margin-left:580px;

`

export const Deletediv=styled.div`

color: #a6a6a6;
  letter-spacing: 0;
  line-height: 20px;
    font-size: 12px;
    font-weight: 400;
  cursor: pointer;

`

export const Modifydiv=styled.div`

color: #a6a6a6;
  letter-spacing: 0;
  line-height: 20px;
    font-size: 12px;
    font-weight: 400;
    cursor: pointer;

    // 이 div 바로 다음(옆)에 나타날 것
    &::after{
    margin-left: 4px;
    content: '';
    display: inline-block;
    height: 10px;
    border-left: 1px solid #D6D6D6;
    width: 4px;
  }
  

`
export const Likecommentdiv=styled.div`
  padding-left: 15px;
  display: flex;
  flex-direction: row;
  width: auto;
  margin-bottom: 15px;

`

export const Titledetaildiv=styled.div`
padding-left: 15px;
width: auto;
letter-spacing: -0.5px;
color: #292929;
font-size: 22px;
    font-weight: bold;
    margin-bottom: 15px;
`

export const Contentdetaildiv= styled.div`
  padding-left: 15px;
  width: auto;
  padding-bottom: 15px;
    line-height: 20px;
    color: #444444;
    font-size: 14px;
    font-weight: 400;
`

export const Likedetaildiv =styled.div`

  display: flex;
  flex-direction: row;
  width: auto;
  margin-bottom: 15px;

`

export const Likedetailbutton =styled.div`
margin-left: 15px;
margin-right: 4px;
    padding: 3px 12px 0 10px;
    line-height: 30px;
    border-radius: 8px;
    color: ${(props)=>props.color};
    font-size: 12px;
    font-weight: bold;
    cursor: pointer;
    background-color:  ${(props)=>props.backgroundcolor};
    background-repeat: no-repeat;
    background-position: left 12px center;
    background-size: 11px 11px;
    

`

export const Likedetailimg= styled.img`
margin-top: 3px;
margin-right: 5px;
width: 15px;
height: 15px;

`
export const Commentsavedetail= styled.div`
  display: flex;
  flex-direction: row;
  border-top: 1px solid #e3e3e3;

`

export const Inputdivdetail=styled.input`
  margin: 0;
    padding: 10px 85px 10px 10px;
    border: 0;
    width: 740px;
    height: 40px;
    line-height: 20px;
    box-sizing: border-box;
    color: #262626;
    font-size: 13px;
    overflow: hidden;
    resize: none;
    background-color: #f8f8f8;
`

export const Savewritedetail = styled.button`

border: none;
text-decoration: none;
    
    width: 40px;
    height: 40px;
    cursor: pointer;
    background-color: #F91F15;
`

export const Commentbox=styled.div`
  display: flex;
  flex-direction: column;
  width: 780px;
  border-top: 1px solid #e3e3e3;
  height: auto;
`

export const Namepicturecomment= styled.div`

  display: flex;
  flex-direction: row;
  width: auto;

`

export const Picturecomment=styled.img`
margin-top: 10px;
margin-left: 10px;
  width: 20px;
    height: 20px;
    border-radius: 4px;

`

export const Namecomment= styled.div`

max-width: 90px;
margin-top: 10px;
margin-left: 10px;
  width: 60px;
  line-height: 20px;
    font-size: 12px;
    font-weight: bold;
    color: #292929;
   // white-space: nowrap;
   // overflow: hidden;
   // text-overflow: ellipsis;
`

export const Contentcomment= styled.div`
  
  margin-left: 10px;
  margin-top: 5px;
  line-height: 20px;
    color: #444444;
    font-size: 14px;
    font-weight: 400;
`

export const Datecommet =styled.div`
  margin-left: 10px;
    color: #a6a6a6;
  letter-spacing: 0;
  line-height: 20px;
    font-size: 12px;
    font-weight: 400;
    margin-bottom: 10px;
`

export const Replycomment=styled.div`
cursor: pointer;
margin-left: 70%;
margin-top: 10px;
color: #a6a6a6;
  letter-spacing: 0;
  line-height: 20px;
    font-size: 12px;
    font-weight: 400;
    cursor: pointer;

  
`
export const Likecomment=styled.div`
cursor: pointer;
margin-left: ${(props)=>props.marginleft || "10px"};
margin-top: 10px;
color: #a6a6a6;
  letter-spacing: 0;
  line-height: 20px;
    font-size: 12px;
    font-weight: 400;
    cursor: pointer;

  
`
export const Singoomment=styled.div`
cursor: pointer;
margin-left: 10px;
margin-top: 10px;
color: #a6a6a6;
  letter-spacing: 0;
  line-height: 20px;
    font-size: 12px;
    font-weight: 400;
    cursor: pointer;

  
`
export const Messagecomment=styled.div`
cursor: pointer;
margin-left: 10px;
margin-top: 10px;
color: #a6a6a6;
  letter-spacing: 0;
  line-height: 20px;
    font-size: 12px;
    font-weight: 400;
    cursor: pointer;

  
`

// 대댓글
export const Replysavedetail= styled.div`
  display: flex;
  flex-direction: row;
  width: 739px;
  margin: 0 4px 4px 35px;
    border: 1px solid #e3e3e3;

`

export const Inputreplydetail= styled.input`
  
  margin: 0;
      background-color: #f8f8f8;
    padding: 10px 85px 10px 10px;
    border: 0;
    width: 737px;
    height: 40px;
    line-height: 20px;
    box-sizing: border-box;
    color: #262626;
    font-size: 13px;
    overflow: hidden;
`


export const ReplyDiv=styled.div`
  width: 720px;
  height: 78px;
  margin: -5px 4px 4px 35px;
  padding: 7px 10px 0 7px;
    border: 1px solid #e3e3e3;
    background-color: #f9f9f9;

`

export const Replycontent=styled.div`

  width: auto;
  line-height: 20px;
    color: #444444;
    margin-left: 10px;
    font-size: 14px;
    margin-top: 5px;
    font-weight: 400;
`

export const Replydate= styled.div`
    margin-left: 10px;
    color: #a6a6a6;
  letter-spacing: 0;
  line-height: 20px;
    font-size: 12px;
    font-weight: 400;

`