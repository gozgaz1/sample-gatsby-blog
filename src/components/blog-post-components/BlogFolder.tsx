import styled from 'styled-components';
import FolderIcon from '../../images/folderIcon.png';
import { Link } from 'gatsby';

const Folder = styled.div`
  background-image: url(${FolderIcon});
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;
  position: fixed;
  bottom: 15vh;
  left: 3vw;
  height: 8rem;
  width: 8rem;
  opacity: 0.8;
  z-index: 100;
  cursor: pointer;
  font-family: StyledHeader;
  font-size: 5vh;
  color: white;
  text-align: center;
  line-height: 11rem;
  vertical-align: middle;
  &:before {
    content: '';
    position: absolute;
    top: -10px;
    right: -29px;
    width: 5rem;
    height: 5rem;
    background-size: cover;
    background-repeat: no-repeat;
    background-position: center;
    opacity: 0.7;
    background-image: url(${FolderIcon});
  }
  &:after {
    content: '';
    position: absolute;
    top: 7rem;
    left: -1rem;
    width: 2rem;
    height: 2rem;
    background-size: cover;
    background-repeat: no-repeat;
    background-position: center;
    opacity: 0.7;
    background-image: url(${FolderIcon});
  }
`;

const MainLink = () => {
  return (
    <Link to="/" title="Home">
      <Folder>Main</Folder>
    </Link>
  );
};

export { MainLink };
