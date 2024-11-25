import MyGrade from '~/components/grade/MyGrade';
import GradeBenefits from '~/components/grade/GradeBenefits';

export default function GradePage() {
  return (
    <div className="pb-4">
      <MyGrade />
      <GradeBenefits />
    </div>
  );
}

