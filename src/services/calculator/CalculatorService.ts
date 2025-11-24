import apiFetch from '../api';

export async function getSubjectList(
  generalGroupName: string,
): Promise<string[]> {
  if (!generalGroupName) {
    throw new Error('General group name is required to fetch subject list');
  }


  return apiFetch<string[]>(`timetables/${generalGroupName}/list`);
}