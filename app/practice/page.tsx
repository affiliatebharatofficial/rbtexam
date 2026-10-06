import { redirect } from 'next/navigation';

// /practice previously returned 404. Practice exams live under /exam,
// so send visitors (and any old external links) straight there.
export default function PracticePage() {
  redirect('/exam');
}
