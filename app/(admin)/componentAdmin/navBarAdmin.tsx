//import global components
import Link from "next/link";

//import icons
import logoIcon from "../../../public/logoIcon.svg";
import Image from "next/image";


const NavBarAdmin = () => {
    return (
        <div className="containerNavBarAdmin flex flex-row justify-center items-center w-full p-4 border-b border-grey bg-[var(--baseColor)] z-10">
            <Link className="titleContainerNavBarAdmin flex flex-row justify-center items-center w-max h-10" href={"/"}>
                <Image width={40} height={40} src={logoIcon} alt={'logo'} />
                <span className="text-[25px] p-2 ">BOUTIQUE</span>
            </Link>
        </div>
    )
}

export default NavBarAdmin;