import React, { useState } from 'react';
import { Button } from 'react-bootstrap';
import './GenreButton.style.css';

const GenreButton = ({ name, id, onClick, isActive }) => {
  const [actBtn, setActBtn] = useState(false);

  //console.log('actBtn', name, actBtn);
  return (
    <Button
      className={`genre-btn-${isActive ? 'active' : ''}`} // 버튼의 활성 상태에 따라 클래스 추가
      onClick={onClick} // 부모 컴포넌트로부터 받은 필터링 함수 호출
    >
      {name}
    </Button>
  );
};

export default GenreButton;
