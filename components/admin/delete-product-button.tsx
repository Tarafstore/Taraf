'use client';

import { Button } from '@/components/ui/button';

export function DeleteProductButton() {
  return (
    <Button
      variant="ghost"
      className="text-red-700 hover:bg-red-50"
      onClick={(event) => {
        const confirmed = window.confirm('هل أنت متأكد من حذف المنتج؟ سيتم حذف الصور المرتبطة أيضاً.');

        if (!confirmed) {
          event.preventDefault();
        }
      }}
    >
      حذف
    </Button>
  );
}
