import styled from "styled-components";
import { React, useState, useEffect } from "react";
import { Link, useNavigate, NavLink, useLocation } from "react-router-dom";
import everyimg from "../../assets/img/nav.logo.png";
import Chat from "../../assets/img/chatlogo.png";
import Inform from "../../assets/img/informlogo.png";

const Homenavbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [board, setBoard] = useState(false);

  useEffect(() => {
    if (location.pathname === "/"||location.pathname === "/freeboard"
      ||location.pathname === "/freeboard"
      ||location.pathname === "/freeboard"
      ||location.pathname === "/freeboard"
      ||location.pathname === "/freeboard"
    ) {
      setBoard(true);
    } else {
      setBoard(false);
    }
  }, [location]);

  return (
    <Navdiv>
      <Wrapper>
        <Imgdiv>
          <Img
            src={everyimg}
            onClick={() => {
              navigate("/");
            }}
          />
        </Imgdiv>
        <Word>
          <Wordeverytime
            top={"17px"}
            size={"12px"}
            color={"#F91F15;"}
            lineheight={"15px"}
            weight={"bold"}
          >
            에브리타임
          </Wordeverytime>
          <Wordeverytime size={"22px"} color={"#292929;"} lineheight={"25px"}>
            한동대
          </Wordeverytime>
        </Word>

        <Boardbox>
          <LinkContent padle={"100px"} to={"/"}>
            게시판
          </LinkContent>
          <LinkContent to={"/schedule"}>시간표</LinkContent>
          <LinkContent to={"/graduateboard"}>강의실</LinkContent>
          <LinkContent to={"/schedule"}>학점계산기</LinkContent>
          <LinkContent to={"/graduateboard"}>친구</LinkContent>
          <LinkContent to={"/schedule"}>책방</LinkContent>
          <LinkContent to={"/schedule"}>캠퍼스 픽</LinkContent>
        </Boardbox>
        <Chatandinformbox>
          <Logoimg src={Chat} />
          <Logoimg src={Inform} />
        </Chatandinformbox>
      </Wrapper>
      {board && (
        <DropdownMenu>
          <MenuColumn>
            <MenuItem to={"/freeboard"}>자유게시판 <Symbol>•</Symbol></MenuItem>
            <MenuItem>비밀게시판 <Symbol>•</Symbol></MenuItem>
            <MenuItem>졸업생게시판 <Symbol>•</Symbol></MenuItem>
            <MenuItem>새내기게시판 <Symbol>•</Symbol></MenuItem>
            <MenuItem>시사·이슈 <Symbol>•</Symbol></MenuItem>
            <MenuItem>장터게시판 <Symbol>•</Symbol></MenuItem>
            <MenuItem>정보게시판 <Symbol>•</Symbol></MenuItem>
            <MenuItem>홍보게시판 <Symbol>•</Symbol></MenuItem>
          </MenuColumn>
          <Separator />
          <MenuColumn>
            <MenuItem>동아리·학회 <Symbol>•</Symbol></MenuItem>
            <MenuItem>취업·진로</MenuItem>
          </MenuColumn>
          <Separator />
          <MenuColumn>
            <MenuItem>전산전자공학부 게시판</MenuItem>
            <MenuItem>생명과학부 게시판 <Symbol>•</Symbol></MenuItem>
            <MenuItem>상사학부 게시판 <Symbol>✨</Symbol></MenuItem>
          </MenuColumn>
          <Separator />
          <MenuColumn>
            <MenuItem>연애/사랑이야기 <Symbol>•</Symbol></MenuItem>
            <MenuItem>콘디 <Symbol>•</Symbol></MenuItem>
            <MenuItem>큐피트게시판 <Symbol>•</Symbol></MenuItem>
            <MenuItem>성 게시판 <Symbol>•</Symbol></MenuItem>
            <MenuItem>알바생 게시판 <Symbol>•</Symbol></MenuItem>
            <MenuItem>넷플릭스/왓챠 게시판 <Symbol>•</Symbol></MenuItem>
            <MenuItem>끝말잇기</MenuItem>
            <MenuItem>썸덕 게시판</MenuItem>
          </MenuColumn>
          <Separator />
          <MenuColumn>
            <MenuItem>요리조리킹 <Symbol>•</Symbol></MenuItem>
            <MenuItem style={{ color: "#F91F15", fontWeight: "bold" }}>게시판 찾기</MenuItem>
          </MenuColumn>
        </DropdownMenu>
      )}
    </Navdiv>
  );
};

export default Homenavbar;

const Chatandinformbox = styled.div`
  display: flex;
  align-items: center;
  margin-left: auto;
  margin-right: 24px;
  height: 100%;
`;

const Boardbox = styled.div`
  padding-top: 30px;
  width: 600px;
  height: 100%;
  font-size: 0;
  text-align: center;
`;

const Word = styled.div`
  width: 120px;
  display: flex;
  flex-direction: column;
`;

const Wordeverytime = styled.div`
  padding-top: ${(props) => props.top || "none"};
  width: auto;
  font-size: ${(props) => props.size};
  color: ${(props) => props.color};
  line-height: ${(props) => props.lineheight};
  font-weight: ${(props) => props.weight || "none"};
`;

const Imgdiv = styled.div`
  float: left;
  margin-left: 24px;
  height: 100%;
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  margin: 0 auto;
  width: 1180px;
  height: 100%;
`;

const Navdiv = styled.nav`
  position: fixed;
  display: flex;
  flex-direction: column;
  z-index: 999;
  width: 100%;
  height: 80px;
  border-bottom: 1px solid #d6d6d6;
  background-color: #fff;
`;

const Img = styled.img`
  float: left;
  display: block;
  margin: 20px 16px 20px 0;
  width: 40px;
  height: 40px;
`;

const LinkContent = styled(NavLink)`
  margin-left: ${(props) => props.padle || "20px"};
  width: auto;
  font-size: 16px;
  font-weight: bold;
  height: auto;
  color: black;
  padding-bottom: 27px;
  text-decoration: none;

  &.active {
    color: red;
    width: auto;
    border-bottom: 4px solid red;
  }
`;

const Logoimg = styled.img`
  width: 24px;
  height: 24px;
  margin: 0 8px;
  cursor: pointer;
  padding: 8px;
  border: 1px solid #d6d6d6;
  border-radius: 12px;
  background-color: #fff;
`;

const DropdownMenu = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  background-color: #f8f8f8;
  border-top: 1px solid #d6d6d6;
  padding: 20px 0;
  position: absolute;
  top: 80px;
  left: 0;
`;

const MenuColumn = styled.div`
  margin: 0 20px;
`;

const MenuItem = styled(Link)`
text-decoration: none;
  font-size: 16px;
  color: #292929;
  margin-bottom: 10px;
  cursor: pointer;
  display: flex;
  align-items: center;

  &:hover {
    color: #f91f15;
  }
`;

const Symbol = styled.span`
  font-size: 16px;
  color: #00aaff;
  margin-left: 5px;
`;

const Separator = styled.div`
  width: 1px;
  background-color: #d6d6d6;
  margin: 0 20px;
`;
