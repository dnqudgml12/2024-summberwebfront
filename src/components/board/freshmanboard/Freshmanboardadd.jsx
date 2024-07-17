import React, { useState, useEffect } from "react";

import { Link, useNavigate, useParams } from "react-router-dom";

import {
  Addtextarea,
  Addtitle,

  Buttonimgcancle,
  Buttonimgsave,
  Formaddstyld,
  Savecancle,
  Savewrite,

} from "../../../styles/BoardStyled";
import Cancle from "../../../assets/img/Cancle.png";
import savebutton from "../../../assets/img/Savebutton.png";
//author부분은 로그인 구현 기능 후에 유저의 이름으로 자동으로 들어가게 할 예정이고
//post state값으로 data를 불러오고 더하는 과정도 api 생성후 axios로 대체 할 예정
/*
 useEffect(() => {
    axios.get(`/api/graduateboard/${id}`).then((response) => {
      setPost(response.data);
    });
  }, [id]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setPost({ ...post, [name]: value });
  };

    const { name, value } = e.target;
    setNewPost({ ...newPost, [name]: value });
  };

  const handleAddPost = () => {
    axios.post("/api/graduateboard", newpost).then(() => {
      navigate("/");
    });
    setnewpost({ title: "", content: "", author: "" });
  };
  const handleUpdatePost = () => {
    axios.put(`/api/graduateboard/${id}`, post).then(() => {
      navigate("/");
    });
  };
 */
const FreshmanboardAdd = ({ onAddPost, onCancel }) => {
  const [newpost, setnewpost] = useState({
    title: "",
    content: "",
    author: "Dummy User",
  });
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setnewpost({ ...newpost, [name]: value });
  };

  const handleAddPost = () => {
    // Data.push({ id: Data.length + 1, ...newpost });
    onAddPost(newpost);
    setnewpost({ title: "", content: "", author: "Dummy User" });
    navigate("/freshmanboard");
  };
  /** 
     * // 이 부분 없애고 dummyUser로 값들어가도록 하였다 로그인한 유저로 값들어가도록 할 예정
     * 
     *       <input
            type="text"
            name="author"
            value={newpost.author}
            onChange={handleInputChange}
            placeholder="Author"
          />
     */

  return (
    <Formaddstyld onSubmit={(e) => e.preventDefault()}>
      <Addtitle
        type="text"
        name="title"
        value={newpost.title}
        onChange={handleInputChange}
        placeholder="글 제목"
      />
      <Addtextarea
        name="content"
        value={newpost.content}
        onChange={handleInputChange}
        placeholder="  에브리타임은 누구나 기분 좋게 참여할 수 있는 커뮤니티를 만들기 위해 커뮤니티 이용규칙을 제정하여 운영하고 있습니다. 위반 시 게시물이 삭제되며 서비스 이용이 일정 기간 제한될 수 있습니다.

    아래는 이 게시판에 해당하는 핵심 내용에 대한 요약 사항이며, 게시물 작성 전 커뮤니티 이용규칙 전문을 반드시 확인하시기 바랍니다.
    
    ※ 정치·사회 관련 행위 금지
    - 국가기관, 정치 관련 단체, 언론, 시민단체에 대한 언급 혹은 이와 관련한 행위
    - 정치·외교 또는 정치·쟁점에 대한 의견, 주장 및 이념, 가치를 드러내는 행위
    - 선거, 폭동, 소요 등 정치적 사안, 정치적 중립성, 정치 성향에 대한 언급 혹은 이와 관련한 행위
    - 위와 같은 내용으로 유추될 수 있는 닉네임, 아이 사용 행위
    ※ 해당 게시물은 삭제, 이후 게시판에만 작성 가능합니다.
    
    ※ 특정 블라인드 언급 행위 금지
    - 임직원 간 차별을 조장해 해사실·개인·단체·개인에게 직간접적으로 영향을 줄 수 있는 게시물 작성 행위
    - 소문, 불확실한 정보로 의심되거나 예상될 수 있는 내용 및 명칭·단어 언급 행위
    ※ 해당 게시물은 삭제, 이후 게시판에만 작성 가능합니다.
    
    ※ 불법행물 유통 금지
    불법촬영물을 게시할 경우 전기통신사업법에 따라 삭제 조치 및 서비스 이용이 영구적으로 제한될 수 있으며 관련 법률에 따라 처벌받을 수 있습니다.
    
    ※ 그 밖의 규칙 위반
    - 커뮤니티 운영 원칙을 침해하거나 불쾌감을 주는 행위
    - 소문, 불법 촬영 등 법령을 위반하는 행위
    - 욕설, 비하, 차별, 음성, 사칭, 폭력적, 선정적 내용을 포함한 게시물 작성 행위
    - 스포일러, 공포, 속임, 놀라게 하는 행위"
      />
      <div style={{ width: "auto", display: "flex", height: "40px" }}>
        <Savewrite type="button" onClick={handleAddPost}>
          <Buttonimgsave src={savebutton}/>
        </Savewrite>
        <Savecancle type="button" onClick={onCancel}>
        <Buttonimgcancle src={Cancle}/>
        </Savecancle>
      </div>
    </Formaddstyld>
  );
};

export default FreshmanboardAdd;
