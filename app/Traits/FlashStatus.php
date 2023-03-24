<?php

namespace App\Traits;

trait FlashStatus
{
    /**
     * Set flash status.
     * Either 'success', 'warning', or 'error'.
     */
    private function setFlashStatus(string $status, string|null $message = null): void
    {
        session()->flash('status', $status);

        if ($message) {
            session()->flash('message', $message);
        }
    }

    /**
     * Set error flash status.
     */
    public function setFlashError(string|null $message = null): void
    {
        $this->setFlashStatus('error', $message);
    }

    /**
     * Set success flash status.
     */
    public function setFlashSuccess(string|null $message = null): void
    {
        $this->setFlashStatus('success', $message);
    }

    /**
     * Set warning flash status.
     */
    public function setFlashWarning(string|null $message = null): void
    {
        $this->setFlashStatus('warning', $message);
    }
}
