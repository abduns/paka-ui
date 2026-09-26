import { REGEXP_ONLY_DIGITS } from 'input-otp';
import { useState } from 'react';
import { toast } from 'sonner';
import { Field, FieldDescription, FieldLabel } from '@/components/ui/field';
import {
    InputOTP,
    InputOTPGroup,
    InputOTPSlot,
} from '@/components/ui/input-otp';

export const meta = {
    name: 'Digits only',
    description: 'Restrict input with a pattern and react on completion.',
};

export default function InputOtpPatternDemo() {
    const [code, setCode] = useState('');

    return (
        <Field className="w-fit">
            <FieldLabel htmlFor="verify-code">Verification code</FieldLabel>
            <InputOTP
                id="verify-code"
                maxLength={6}
                pattern={REGEXP_ONLY_DIGITS}
                value={code}
                onChange={setCode}
                onComplete={() => toast.success('Device verified')}
            >
                <InputOTPGroup>
                    <InputOTPSlot index={0} />
                    <InputOTPSlot index={1} />
                    <InputOTPSlot index={2} />
                    <InputOTPSlot index={3} />
                    <InputOTPSlot index={4} />
                    <InputOTPSlot index={5} />
                </InputOTPGroup>
            </InputOTP>
            <FieldDescription>
                Enter the 6-digit code we sent to maria@acme.com.
            </FieldDescription>
        </Field>
    );
}
