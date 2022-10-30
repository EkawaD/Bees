export { default } from './CV'
import { SiTypescript, SiPython, SiReact, SiJavascript, SiNodedotjs, SiDocker, SiPostgresql, SiMongodb, SiExpress, SiNextdotjs, SiPandas, SiNumpy, SiGit } from 'react-icons/si';
import { GiBallerinaShoes, GiCook, GiDutchBike, GiGamepad, GiGuitarHead, GiKeyboard, GiTennisRacket } from 'react-icons/gi'
import { BsBookHalf, BsQuestionCircleFill } from 'react-icons/bs'
import { VscTerminalBash } from 'react-icons/vsc'
import { BiCameraMovie } from 'react-icons/bi'
import { FaTheaterMasks } from 'react-icons/fa'
import styles from './CV.module.css';



export function Skill({ skill, className }: { skill: string, className?: string }) {

    return (
        <>

            {
                (() => {
                    if (skill === "Typescript")
                        return <SiTypescript className={className} />
                    if (skill === "Python")
                        return <SiPython className={className} />
                    if (skill === "React")
                        return <SiReact className={className} />
                    if (skill === "Javascript")
                        return <SiJavascript className={className} />
                    if (skill === "Node.js")
                        return <SiNodedotjs className={className} />
                    if (skill === "Docker")
                        return <SiDocker className={className} />
                    if (skill === "Bash")
                        return <VscTerminalBash className={className} />
                    if (skill === "SQL")
                        return <SiPostgresql className={className} />
                    if (skill === "NoSQL")
                        return <SiMongodb className={className} />
                    if (skill === "MERN")
                        return <SiExpress className={className} />
                    if (skill === "Next.js")
                        return <SiNextdotjs className={className} />
                    if (skill === "Pandas")
                        return <SiPandas className={className} />
                    if (skill === "Numpy")
                        return <SiNumpy className={className} />
                    if (skill === "Git")
                        return <SiGit className={className} />
                    if (skill === "Git")
                        return <SiGit className={className} />
                    if (skill === "Jeux vidéo")
                        return <GiGamepad className={className} />
                    if (skill === "Musique")
                        return <GiGuitarHead className={className} />
                    if (skill === "Vélo")
                        return <GiDutchBike className={className} />
                    if (skill === "Tennis")
                        return <GiTennisRacket className={className} />
                    if (skill === "Coding")
                        return <GiKeyboard className={className} />
                    if (skill === "Littérature")
                        return <BsBookHalf className={className} />
                    if (skill === "Cinéma")
                        return <BiCameraMovie className={className} />
                    if (skill === "Théatre")
                        return <FaTheaterMasks className={className} />
                    if (skill === "Danse")
                        return <GiBallerinaShoes className={className} />
                    if (skill === "Cuisine")
                        return <GiCook className={className} />

                    else
                        return <BsQuestionCircleFill className={className} />
                })()
            }
            {skill}


        </>
    );
}


export const formatDate = (dateString: string) => {
    const options = { year: "2-digit", month: "short" }
    return new Date(dateString).toLocaleDateString(undefined, options as any)
}

export const diplomeByDate = (a: Diplome, b: Diplome) => new Date(b.diplomaDate).getTime() - new Date(a.diplomaDate).getTime();
export const experienceByDate = (a: Experience, b: Experience) => new Date(b.startDate).getTime() - new Date(a.startDate).getTime();
export const skillbyId = (a: Skill, b: Skill) => Number(a.id) - Number(b.id)

