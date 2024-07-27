import styled from "styled-components";
import { React, useState, useEffect } from "react";
import { Link, useNavigate, NavLink, useLocation } from "react-router-dom";
import everyimg from "../../assets/img/nav.logo.png";
import Chat from "../../assets/img/chatlogo.png";
import Inform from "../../assets/img/informlogo.png";
import GoogleAuthLogin from "../loginButton";
const Homenavbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [board, setBoard] = useState(false);
  const [activeMenuItem, setActiveMenuItem] = useState("/");

  // 특정 페이지에서는 setBoard가 true로 해서 dropdownmenu가 실행되게 하기 위해서
  useEffect(() => {
    if (location.pathname === "/" || location.pathname.endsWith("board")) {
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
            active={activeMenuItem === "/"}
         
            onClick={() => {
              navigate("/");
              setActiveMenuItem("/");
              
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
          <LinkContent
            to="/"
            active={activeMenuItem === "/"}
            onClick={() => setActiveMenuItem("/")}
          >
            게시판
          </LinkContent>
          <LinkContent
            to="/schedule"
            active={activeMenuItem === "/schedule"}
            onClick={() => setActiveMenuItem("/schedule")}
          >
            시간표
          </LinkContent>
          <LinkContent
            onClick={() => {
              alert("아직 준비 중입니다.");
            }}
            // to="/404"
            //active={activeMenuItem === '/404'}
            //onClick={() => setActiveMenuItem('/404')}
          >
            강의실
          </LinkContent>
          <LinkContent
            onClick={() => {
              alert("아직 준비 중입니다.");
            }}
            //to="/404"
            // active={activeMenuItem === '/404'}
            // onClick={() => setActiveMenuItem('/404')}
          >
            학점계산기
          </LinkContent>
          <LinkContent
            onClick={() => {
              alert("아직 준비 중입니다.");
            }}
            //to="/404"
            // active={activeMenuItem === '/404'}
            // onClick={() => setActiveMenuItem('/404')}
          >
            친구
          </LinkContent>
          <LinkContent
            onClick={() => {
              alert("아직 준비 중입니다.");
            }}
            // to="/404"
            // active={activeMenuItem === '/404'}
            // onClick={() => setActiveMenuItem('/404')}
          >
            책방
          </LinkContent>
          <LinkContent
            onClick={() => {
              alert("아직 준비 중입니다.");
            }}
            //to="/404"
            // active={activeMenuItem === '/404'}
            //onClick={() => setActiveMenuItem('/404')}
          >
            캠퍼스 픽
          </LinkContent>
        </Boardbox>
        <Chatandinformbox>
          <Logoimg
            src={Chat}
            onClick={() => {
              alert("아직 준비 중입니다.");
            }}
          />
          <Logoimg
            src={Inform}
            onClick={() => {
              alert("아직 준비 중입니다.");
            }}
          />
        </Chatandinformbox>
        <GoogleAuthLogin/>

      </Wrapper>
      {/*
      {board && (

      )}*/}
    </Navdiv>
  );
};

export { Homenavbar, Dropdownmenu };

const Dropdownmenu = () => {
  return (
    <DropdownMenu>
      <MenuColumn>
        <MenuItem
          to="/freeboard"
          onClick={() => setActiveMenuItem("/freeboard")}
        >
          자유게시판 <Symbol>•</Symbol>
        </MenuItem>
        <MenuItem
          to="/secretboard"
          onClick={() => setActiveMenuItem("/secretboard")}
        >
          비밀게시판 <Symbol>•</Symbol>
        </MenuItem>
        <MenuItem
          to="/graduateboard"
          onClick={() => setActiveMenuItem("/graduateboard")}
        >
          졸업생게시판 <Symbol>•</Symbol>
        </MenuItem>
        <MenuItem
             to="/freshmanboard"
             onClick={() => setActiveMenuItem("/freshmanboard")}
        >
          새내기게시판 <Symbol>•</Symbol>
        </MenuItem>
        <MenuItem
               to="/socialboard"
               onClick={() => setActiveMenuItem("/socialboard")}
        >
          시사·이슈 <Symbol>•</Symbol>
        </MenuItem>
        <MenuItem
          onClick={() => {
            alert("아직 준비 중입니다.");
          }}
        >
          장터게시판 <Symbol>•</Symbol>
        </MenuItem>
        <MenuItem
             to="/informationboard"
             onClick={() => setActiveMenuItem("/informationboard")}
        >
          정보게시판 <Symbol>•</Symbol>
        </MenuItem>
        <MenuItem
             to="/advertiseboard"
             onClick={() => setActiveMenuItem("/advertiseboard")}
        >
          홍보게시판 <Symbol>•</Symbol>
        </MenuItem>
      </MenuColumn>
      <Separator />
      <MenuColumn>
        <MenuItem
             to="/circleboard"
             onClick={() => setActiveMenuItem("/circleboard")}
        >
          동아리·학회 <Symbol>•</Symbol>
        </MenuItem>
        <MenuItem
          onClick={() => {
            alert("아직 준비 중입니다.");
          }}
        >
          취업·진로
        </MenuItem>
      </MenuColumn>
      <Separator />
      <MenuColumn>
        <MenuItem
          onClick={() => {
            alert("아직 준비 중입니다.");
          }}
        >
          전산전자공학부 게시판
        </MenuItem>
        <MenuItem
          onClick={() => {
            alert("아직 준비 중입니다.");
          }}
        >
          생명과학부 게시판 <Symbol>•</Symbol>
        </MenuItem>
        <MenuItem
          onClick={() => {
            alert("아직 준비 중입니다.");
          }}
        >
          상사학부 게시판 <Symbol>✨</Symbol>
        </MenuItem>
      </MenuColumn>
      <Separator />
      <MenuColumn>
        <MenuItem
          onClick={() => {
            alert("아직 준비 중입니다.");
          }}
        >
          연애/사랑이야기 <Symbol>•</Symbol>
        </MenuItem>
        <MenuItem
          onClick={() => {
            alert("아직 준비 중입니다.");
          }}
        >
          콘디 <Symbol>•</Symbol>
        </MenuItem>
        <MenuItem
          onClick={() => {
            alert("아직 준비 중입니다.");
          }}
        >
          큐피트게시판 <Symbol>•</Symbol>
        </MenuItem>
        <MenuItem
          onClick={() => {
            alert("아직 준비 중입니다.");
          }}
        >
          성 게시판 <Symbol>•</Symbol>
        </MenuItem>
        <MenuItem
          onClick={() => {
            alert("아직 준비 중입니다.");
          }}
        >
          알바생 게시판 <Symbol>•</Symbol>
        </MenuItem>
        <MenuItem
          onClick={() => {
            alert("아직 준비 중입니다.");
          }}
        >
          넷플릭스/왓챠 게시판 <Symbol>•</Symbol>
        </MenuItem>
        <MenuItem
          onClick={() => {
            alert("아직 준비 중입니다.");
          }}
        >
          끝말잇기
        </MenuItem>
        <MenuItem
          onClick={() => {
            alert("아직 준비 중입니다.");
          }}
        >
          썸덕 게시판
        </MenuItem>
      </MenuColumn>
      <Separator />
      <MenuColumn>
        <MenuItem
          onClick={() => {
            alert("아직 준비 중입니다.");
          }}
        >
          요리조리킹 <Symbol>•</Symbol>
        </MenuItem>
        <MenuItem>게시판 찾기</MenuItem>
      </MenuColumn>
    </DropdownMenu>
  );
};

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
  cursor: pointer;
`;

const LinkContent = styled(NavLink)`
  margin-left: ${(props) => props.padle || "20px"};
  width: auto;
  font-size: 16px;
  font-weight: bold;
  height: auto;
  color: ${(props) => (props.active ? "red" : "black")};
  padding-bottom: 27px;
  text-decoration: none;
  border-bottom: ${(props) => (props.active ? "4px solid red" : "none")};
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
