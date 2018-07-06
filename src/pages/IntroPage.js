import React from 'react';
import { Carousel } from 'antd';

function IntroPage(props) {
  return (
    <div className="intro-page">
      <div className="intro-page__content">
        <div>
          <h2 className="intro-page__title">
            WELCOME <span>SEEMVA</span>
          </h2>
          <div className="intro-page__carousel">
            <Carousel autoplay effect="fade">
              <div>
                <h3>
                  팀 페이지를 추가하고 팀원을 초대하세요<br />
                  왼쪽 메뉴에서 팀 페이지를 이동할 수 있습니다
                </h3>
              </div>
              <div>
                <h3>
                  프로젝트 그룹을 생성하고 내부에 태스크를 추가해 관리하세요<br />
                  태스크 모달에서 팀원추가와 라벨을 관리할 수 있습니다
                </h3>
              </div>
            </Carousel>
          </div>
        </div>
      </div>
    </div>
  );
}

export default IntroPage;
