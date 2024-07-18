import {Education} from './education';
import {EmploymentHistory} from './employment-history';
import {Skill} from './skill';
import {Language} from './language';
import {Refrence} from './refrence';
import {AwardsAchivement} from './awards-achivement';
import {Interest} from './interest';
import {IndustrialExposure} from './industrial-exposure';
import {ProjectDetail} from './project-detail';
import {Strength} from './strength';
import {Weakness} from './weakness';
import {Objective} from './objective';

export interface Resume {
  _id: string;
  name: string;
  user_id: string;
  image_url: string;
  video_url: string;
  views: number;
  contact_details: Contact;
  education: Education[];
  employment_history: EmploymentHistory[];
  skills: Skill[];
  languages: Language[];
  refrences: Refrence[];
  award_achivements: AwardsAchivement[];
  interests: Interest[];
  industrialExposures: IndustrialExposure[];
  projectDetails: ProjectDetail[];
  strengths: Strength[];
  weakness: Weakness[];
  objectives: Objective[];
}

export interface Contact {
  _id: string;
  first_name: string;
  last_name: string;
  phone_number: number;
  linkedin_url: string;
  website_url: string;
  email: string;
  address: string;
  city: string;
  state: string;
  zip_code: number;
  country: string;
  summary: string;
}
