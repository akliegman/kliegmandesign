import "React" from "react";
import "./Resume.scss";
import { resumeData } from "../data/resumeData";
import { ResumeSection } from "./ResumeSection/ResumeSection";
import { ResumeSectionHeader } from "./ResumeSectionHeader/ResumeSectionHeader";
import { ResumeSectionItem } from "./ResumeSectionItem/ResumeSectionItem";
import { ResumeSectionItemHeader } from "./ResumeSectionItemHeader/ResumeSectionItemHeader";
import { ResumeSectionItemSubheader } from "./ResumeSectionItemSubheader/ResumeSectionItemSubheader";
import { ResumeSectionItemContent } from "./ResumeSectionItemContent/ResumeSectionItemContent";

export const Resume = () => {
    return (
        <div className="Resume">
        <ResumeSection>
            <ResumeSectionHeader>Education</ResumeSectionHeader>
            {resumeData.education.map((education) => (
            <ResumeSectionItem>
                <ResumeSectionItemHeader>
                {education.degree}
                </ResumeSectionItemHeader>
                <ResumeSectionItemSubheader>
                {education.school}
                </ResumeSectionItemSubheader>
                <ResumeSectionItemContent>
                {education.description}
                </ResumeSectionItemContent>
            </ResumeSectionItem>
            ))}
        </ResumeSection>
        <ResumeSection>
            <ResumeSectionHeader>Experience</ResumeSectionHeader>
            {resumeData.experience.map((experience) => (
            <ResumeSectionItem>
                <ResumeSectionItemHeader>
                {experience.title}
                </ResumeSectionItemHeader>
                <ResumeSectionItemSubheader>
                {experience.company}
                </ResumeSectionItemSubheader>
                <ResumeSectionItemContent>
                {experience.description}
                </ResumeSectionItemContent>
            </ResumeSectionItem>
            ))}
        </ResumeSection>
        <ResumeSection>
            <ResumeSectionHeader>Skills</ResumeSectionHeader>
            {resumeData.skills.map((skill) => (
            <ResumeSectionItem>
                <ResumeSectionItemHeader>
                {skill.title}
                </ResumeSectionItemHeader>
                <ResumeSectionItemContent>
                {skill.description}
                </ResumeSectionItemContent>
            </ResumeSectionItem>
            ))}
        </ResumeSection>
        </div>
    );
    }
