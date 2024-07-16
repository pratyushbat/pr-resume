import {Injectable} from '@angular/core';
import {ApiService} from '../services/api-service';
import {Store} from '@ngrx/store';
import {getResume, getResumeById, resumeError, resumeLoaded, resumeLoading} from '../reducers';
import {combineLatest, Observable} from 'rxjs';
import {
  AddAwardAction,
  AddContactDetailAction,
  AddEducationAction,
  AddEmploymentHistoryAction, AddIndustrialExposureAction,
  AddInterestAction,
  AddLanguageAction, AddObjectiveAction, AddProjectDetailAction, AddReferenceAction,
  AddResumeAction,
  AddSkillAction, AddStrengthAction, AddWeaknessAction, DeleteAwardAction,
  DeleteEducationAction,
  DeleteEmploymentHistoryAction, DeleteIndustrialExposureAction,
  DeleteInterestAction, DeleteLanguageAction, DeleteObjectiveAction, DeleteProjectDetailAction, DeleteReferenceAction, DeleteResumeAction,
  DeleteSkillAction, DeleteStrengthAction, DeleteWeaknessAction,
  ResumeErrorAction,
  ResumeListRequestAction,
  ResumeListSuccessAction, UpdateAwardAction,
  UpdateContactDetailAction,
  UpdateEducationAction,
  UpdateEmploymentHistoryAction, UpdateIndustrialExposureAction,
  UpdateInterestAction,
  UpdateLanguageAction, UpdateObjectiveAction, UpdateProjectDetailAction, UpdateReferenceAction,
  UpdateResumeAction,
  UpdateSkillAction, UpdateStrengthAction, UpdateWeaknessAction
} from '../actions/resume-actions';
import {map, take} from 'rxjs/operators';
import {Resume} from '../models/resume';
import {UserUpdateAction} from '../actions/user-actions';

@Injectable()
export class ResumeRepository {
  constructor(private apiService: ApiService, private store: Store) {
  }

  fetchAllResumes(force = false): [Observable<boolean>, Observable<boolean>, Observable<Resume[]>] {
    const loading$ = this.store.select(resumeLoading);
    const loaded$ = this.store.select(resumeLoaded);
    const resume$ = this.store.select(getResume);
    const error$ = this.store.select(resumeError);
    combineLatest([loading$, loaded$]).pipe(take(1)).subscribe(data => {
      if (!data[0] && !data[1] || force) {
        this.store.dispatch(new ResumeListRequestAction());
        this.apiService.fetchAllResumes().subscribe(resume => {
          this.store.dispatch(new ResumeListSuccessAction(resume));
        }, error => {
          this.store.dispatch(new ResumeErrorAction());
        });
      }
    });
    return [loading$, error$, resume$];
  }

  getResumeById(id, force = false) {
    const resume$ = this.store.select((state: any) => {
      return getResumeById(state, id);
    });
    resume$.pipe(take(1)).subscribe(data => {
      if (!data || force) {
        this.apiService.getResumeById(id).subscribe(res => {
          this.store.dispatch(new AddResumeAction(res));
        });
      }
    });
    return resume$;
  }

  saveResume(data): Observable<any> {
    return this.apiService.saveResume(data).pipe(map((resume) => {
      this.store.dispatch(new AddResumeAction(resume));
      return resume;
    }));
  }

  editResume(data, resumeId) {
    return this.apiService.editResume(data, resumeId).pipe(map((resume) => {
      this.store.dispatch(new UpdateResumeAction(resume));
    }));
  }

  deleteResume(resumeId) {
    return this.apiService.deleteResume(resumeId).pipe(map((resume) => {
      this.store.dispatch(new DeleteResumeAction(resumeId));
    }));
  }

  saveOrUpdateImage(image: File, resumeId: string) {
    return this.apiService.saveOrUpdateImage(image, resumeId).pipe(map((resume) => {
      this.store.dispatch(new UpdateResumeAction(resume));
      return resume;
    }));
  }

  deleteImage(resumeId: string) {
    return this.apiService.deleteImage(resumeId).pipe(map((resume) => {
      this.store.dispatch(new UpdateResumeAction(resume));
      return resume;
    }));
  }

  addVideo(resumeId: string, data: { video_url: string }) {
    return this.apiService.addVideo(resumeId, data).pipe(map((resume) => {
      this.store.dispatch(new UpdateResumeAction(resume));
      return resume;
    }));
  }

  updateContactDetails(data, contactDetailId: string, resumeId: string) {
    return this.apiService.updateContactDetails(data, contactDetailId).pipe(map((res) => {
      this.store.dispatch(new UpdateContactDetailAction({resume_id: resumeId, contact: res}));
      return res;
    }));
  }

  addContactDetails(data, resumeId: string) {
    return this.apiService.addContactDetails(data, resumeId).pipe(map((res) => {
      this.store.dispatch(new AddContactDetailAction({resume_id: resumeId, contact: res}));
      return res;
    }));
  }

  addSkill(data, resumeId: string) {
    return this.apiService.addSkill(data, resumeId).pipe(map(res => {
      this.store.dispatch(new AddSkillAction({skill: res, resume_id: resumeId}));
    }));
  }

  updateSkill(data: any, skillId: string, resumeId: string) {
    return this.apiService.updateSkill(data, skillId).pipe(map(res => {
      this.store.dispatch(new UpdateSkillAction({skill: res, resume_id: resumeId}));
    }));
  }

  deleteSkill(skillId: string, resumeId: string) {
    return this.apiService.deleteSkill(skillId).pipe(map(res => {
      this.store.dispatch(new DeleteSkillAction({skill: res, resume_id: resumeId}));
    }));
  }

  updateViews(data: { views: number }, id: string) {
    return this.apiService.updateViewsCount(data, id).pipe(map(res => {
      this.store.dispatch(new UpdateResumeAction(res));
    }));
  }

  addEducation(data, resumeId: string) {
    return this.apiService.addEducation(data, resumeId).pipe(map((res) => {
      this.store.dispatch(new AddEducationAction({education: res, resume_id: resumeId}));
      return res;
    }));
  }

  updateEducation(data, educationId: string, resumeId: string,) {
    return this.apiService.updateEducation(data, educationId).pipe(map((res) => {
      this.store.dispatch(new UpdateEducationAction({education: res, resume_id: resumeId}));
      return res;
    }));
  }

  deleteEducation(resumeId: string, educationId: string) {
    return this.apiService.deleteEducation(educationId).pipe(map((res) => {
      this.store.dispatch(new DeleteEducationAction({education: res, resume_id: resumeId}));
      return res;
    }));
  }

  addEmploymentHistory(data, resumeId: string) {
    return this.apiService.addEmploymentHistory(data, resumeId).pipe(map((res) => {
      this.store.dispatch(new AddEmploymentHistoryAction({employment_history: res, resume_id: resumeId}));
      return res;
    }));
  }

  updateEmploymentHistory(data, employmentHistoryId: string, resumeId: string) {
    return this.apiService.updateEmploymentHistory(data, employmentHistoryId).pipe(map((res) => {
      this.store.dispatch(new UpdateEmploymentHistoryAction({employment_history: res, resume_id: resumeId}));
      return res;
    }));
  }

  deleteEmploymentHistory(employmentHistoryId: string, resumeId: string) {
    return this.apiService.deleteEmploymentHistory(employmentHistoryId).pipe(map((res) => {
      this.store.dispatch(new DeleteEmploymentHistoryAction({employment_history: res, resume_id: resumeId}));
      return res;
    }));
  }

  addInterest(data, resumeId: string) {
    return this.apiService.addInterest(data, resumeId).pipe(map((res) => {
      this.store.dispatch(new AddInterestAction({interest: res, resume_id: resumeId}));
      return res;
    }));
  }

  updateInterest(data, resumeId: string, interestId: string) {
    return this.apiService.updateInterest(data, interestId).pipe(map((res) => {
      this.store.dispatch(new UpdateInterestAction({interest: res, resume_id: resumeId}));
      return res;
    }));
  }

  deleteInterest(resumeId: string, interestId: string) {
    console.log(interestId);
    return this.apiService.deleteInterest(interestId).pipe(map((res) => {
      this.store.dispatch(new DeleteInterestAction({interest: res, resume_id: resumeId}));
      return res;
    }));
  }

  addLanguage(data, resumeId: string) {
    return this.apiService.addLanguage(data, resumeId).pipe(map((res) => {
      this.store.dispatch(new AddLanguageAction({language: res, resume_id: resumeId}));
      return res;
    }));
  }

  updateLanguage(data, resumeId: string, languageId: string) {
    return this.apiService.updateLanguage(data, languageId).pipe(map((res) => {
      this.store.dispatch(new UpdateLanguageAction({language: res, resume_id: resumeId}));
      return res;
    }));
  }

  deleteLanguage(resumeId: string, languageId: string) {
    return this.apiService.deleteLanguage(languageId).pipe(map((res) => {
      this.store.dispatch(new DeleteLanguageAction({language: res, resume_id: resumeId}));
      return res;
    }));
  }

  addIndustrialExposure(data, resumeId: string) {
    return this.apiService.addIndustrialExposure(data, resumeId).pipe(map((res) => {
      this.store.dispatch(new AddIndustrialExposureAction({industrial_exposure: res, resume_id: resumeId}));
      return res;
    }));
  }

  updateIndustrialExposure(data, resumeId: string, industrialExposureId: string) {
    return this.apiService.updateIndustrialExposure(data, industrialExposureId).pipe(map((res) => {
      this.store.dispatch(new UpdateIndustrialExposureAction({industrial_exposure: res, resume_id: resumeId}));
      return res;
    }));
  }

  deleteIndustrialExposure(resumeId: string, industrialExposureId: string) {
    return this.apiService.deleteIndustrialExposure(industrialExposureId).pipe(map((res) => {
      this.store.dispatch(new DeleteIndustrialExposureAction({industrial_exposure: res, resume_id: resumeId}));
      return res;
    }));
  }

  addAward(data, resumeId: string) {
    return this.apiService.addAward(data, resumeId).pipe(map((res) => {
      this.store.dispatch(new AddAwardAction({award: res, resume_id: resumeId}));
      return res;
    }));
  }

  updateAward(data, resumeId: string, awardId: string) {
    return this.apiService.updateAward(data, awardId).pipe(map((res) => {
      this.store.dispatch(new UpdateAwardAction({award: res, resume_id: resumeId}));
      return res;
    }));
  }

  deleteAward(resumeId: string, awardId: string) {
    return this.apiService.deleteAward(awardId).pipe(map((res) => {
      console.log(res);
      this.store.dispatch(new DeleteAwardAction({award: res, resume_id: resumeId}));
      return res;
    }));
  }

  addObjective(data, resumeId: string) {
    return this.apiService.addObjective(data, resumeId).pipe(map((res) => {
      this.store.dispatch(new AddObjectiveAction({objective: res, resume_id: resumeId}));
      return res;
    }));
  }

  updateObjective(data, resumeId: string, objectiveId: string) {
    return this.apiService.updateObjective(data, objectiveId).pipe(map((res) => {
      this.store.dispatch(new UpdateObjectiveAction({objective: res, resume_id: resumeId}));
      return res;
    }));
  }

  deleteObjective(resumeId: string, objectiveId: string) {
    return this.apiService.deleteObjective(objectiveId).pipe(map((res) => {
      this.store.dispatch(new DeleteObjectiveAction({objective: res, resume_id: resumeId}));
      return res;
    }));
  }

  addReference(data, resumeId: string) {
    return this.apiService.addReference(data, resumeId).pipe(map((res) => {
      this.store.dispatch(new AddReferenceAction({reference: res, resume_id: resumeId}));
      return res;
    }));
  }

  updateReference(data, resumeId: string, referenceId: string) {
    return this.apiService.updateReference(data, referenceId).pipe(map((res) => {
      this.store.dispatch(new UpdateReferenceAction({reference: res, resume_id: resumeId}));
      return res;
    }));
  }

  deleteReference(resumeId: string, referenceId: string) {
    return this.apiService.deleteReference(referenceId).pipe(map((res) => {
      this.store.dispatch(new DeleteReferenceAction({reference: res, resume_id: resumeId}));
      return res;
    }));
  }


  addProjectDetail(data, resumeId: string) {
    return this.apiService.addProjectDetail(data, resumeId).pipe(map((res) => {
      this.store.dispatch(new AddProjectDetailAction({project_detail: res, resume_id: resumeId}));
      return res;
    }));
  }

  updateProjectDetail(data, resumeId: string, projectDetailId: string) {
    return this.apiService.updateProjectDetail(data, projectDetailId).pipe(map((res) => {
      this.store.dispatch(new UpdateProjectDetailAction({project_detail: res, resume_id: resumeId}));
      return res;
    }));
  }

  deleteProjectDetail(resumeId: string, projectDetailId: string) {
    return this.apiService.deleteProjectDetail(projectDetailId).pipe(map((res) => {
      this.store.dispatch(new DeleteProjectDetailAction({project_detail: res, resume_id: resumeId}));
      return res;
    }));
  }

  addStrength(data, resumeId: string) {
    return this.apiService.addStrength(data, resumeId).pipe(map((res) => {
      this.store.dispatch(new AddStrengthAction({strength: res, resume_id: resumeId}));
      return res;
    }));
  }

  updateStrength(data, resumeId: string, projectDetailId: string) {
    return this.apiService.updateStrength(data, projectDetailId).pipe(map((res) => {
      this.store.dispatch(new UpdateStrengthAction({strength: res, resume_id: resumeId}));
      return res;
    }));
  }

  deleteStrength(resumeId: string, projectDetailId: string) {
    return this.apiService.deleteStrength(projectDetailId).pipe(map((res) => {
      this.store.dispatch(new DeleteStrengthAction({strength: res, resume_id: resumeId}));
      return res;
    }));
  }

  addWeakness(data, resumeId: string) {
    return this.apiService.addWeakness(data, resumeId).pipe(map((res) => {
      this.store.dispatch(new AddWeaknessAction({weakness: res, resume_id: resumeId}));
      return res;
    }));
  }

  updateWeakness(data, resumeId: string, weaknessId: string) {
    return this.apiService.updateWeakness(data, weaknessId).pipe(map((res) => {
      this.store.dispatch(new UpdateWeaknessAction({weakness: res, resume_id: resumeId}));
      return res;
    }));
  }

  deleteWeakness(resumeId: string, weaknessId: string) {
    return this.apiService.deleteWeakness(weaknessId).pipe(map((res) => {
      this.store.dispatch(new DeleteWeaknessAction({weakness: res, resume_id: resumeId}));
      return res;
    }));
  }

  updateOnBoarding(data: { onboarding: number }) {
    return this.apiService.updateOnBoarding(data).pipe(map(res => {
      this.store.dispatch(new UserUpdateAction(res));
    }));
  }

}
