import { Check } from "lucide-react";
import { cn } from "@/lib/utils";

type WizardStepperProps = {
  currentStep: 1 | 2;
};

export function WizardStepper({ currentStep }: WizardStepperProps) {
  return (
    <div className="mb-8">
      <div className="flex items-center justify-center gap-4">
        {/* Step 1 */}
        <div className="flex items-center gap-3">
          <div
            className={cn(
              "flex items-center justify-center w-10 h-10 rounded-full font-semibold transition-colors",
              currentStep === 1
                ? "bg-blue-600 text-white"
                : "bg-green-600 text-white",
            )}
          >
            {currentStep === 1 ? "1" : <Check className="w-5 h-5" />}
          </div>
          <span
            className={cn(
              "text-sm font-medium",
              currentStep === 1 ? "text-slate-900" : "text-slate-600",
            )}
          >
            Upload
          </span>
        </div>

        {/* Divider */}
        <div className="w-16 h-0.5 bg-slate-300" />

        {/* Step 2 */}
        <div className="flex items-center gap-3">
          <div
            className={cn(
              "flex items-center justify-center w-10 h-10 rounded-full font-semibold transition-colors",
              currentStep === 2
                ? "bg-blue-600 text-white"
                : "bg-slate-200 text-slate-500",
            )}
          >
            2
          </div>
          <span
            className={cn(
              "text-sm font-medium",
              currentStep === 2 ? "text-slate-900" : "text-slate-500",
            )}
          >
            Categorizar
          </span>
        </div>
      </div>
    </div>
  );
}
