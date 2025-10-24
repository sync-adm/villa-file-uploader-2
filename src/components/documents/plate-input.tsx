"use client";

import { forwardRef, type ChangeEvent } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

type PlateInputProps = {
  error?: string;
  disabled?: boolean;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
  name?: string;
};

export const PlateInput = forwardRef<HTMLInputElement, PlateInputProps>(
  ({ error, disabled, onChange, name }, ref) => {
    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value.toUpperCase().replace(/[^A-Z0-9]/g, "");
      e.target.value = value;
      onChange?.(e);
    };

    return (
      <div className="space-y-2 max-w-60">
        <Label htmlFor="plate">Placa do Veículo</Label>
        <Input
          id="plate"
          name={name}
          ref={ref}
          placeholder="ABC1234"
          maxLength={7}
          onChange={handleChange}
          disabled={disabled}
          className="text-lg font-mono"
          aria-invalid={!!error}
          aria-describedby={error ? "plate-error" : undefined}
        />
        {error && (
          <p id="plate-error" className="text-sm text-red-600">
            {error}
          </p>
        )}
      </div>
    );
  },
);

PlateInput.displayName = "PlateInput";
