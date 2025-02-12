"use client";

import { useAppContext } from '@/app/context_';
import { useAuth } from '@/app/context_/AuthContext';
import { Button } from '@/components/ui/button';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { api } from '@/convex/_generated/api';
import { useApiMutation } from '@/hooks/use-api-mutation';
import { useOrigin } from '@/hooks/use-origin';
import { Check, Copy, Globe, ShareIcon } from 'lucide-react';
import React, { useState } from 'react';
import { toast } from 'sonner';

export const Share: React.FC = () => {
  const { fileData, setFileData } = useAppContext();
  const { user } = useAuth();
  const origin = useOrigin();

  const { mutate } = useApiMutation(api.files.updateFileName);

  const [copied, setCopied] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const url = fileData ? `${origin}/preview/${fileData._id}` : '';

  const handlePublishState = (isPublished: boolean) => {
    if (!fileData) return;

    setIsSubmitting(true);
    const action = isPublished ? "Publishing" : "Unpublishing";

    const promise = new Promise<void>((resolve, reject) => {
      try {
        mutate({
          _id: fileData._id,
          createdBy: user.id,
          fileName: fileData.fileName,
          dateModified: Date.now(),
          isPublished,
        });
        resolve();
      } catch (error) {
        reject(error);
      }
    });

    toast.promise(
      promise,
      {
        loading: `${action}...`,
        success: `File ${isPublished ? "published" : "unpublished"}`,
        error: `Failed to ${action.toLowerCase()}`,
      }
    );

    promise
      .then(() => {
        setFileData({
          ...fileData,
          isPublished,
        });
      })
      .finally(() => {
        setIsSubmitting(false);
      });
  };

  const onCopy = () => {
    if (url) {
      navigator.clipboard.writeText(url).then(() => {
        setCopied(true);
        setTimeout(() => setCopied(false), 1000);
      });
    }
  };

  const published = fileData?.isPublished;

  return (
    <Popover>
      <PopoverTrigger asChild>
        {published ? (
          <Button className="h-8 text-[12px] gap-2 bg-green-700 dark:bg-green-700 text-white">
            <Globe className="h-3 w-3" />
            <span>Published</span>
          </Button>
        ) : (
          <Button className="h-8 text-[12px] gap-2 bg-blue-700 dark:bg-blue-700 text-white">
            <ShareIcon className="h-3 w-3" />
            <span>Share</span>
          </Button>
        )}
      </PopoverTrigger>
      <PopoverContent className="w-72" align="end" alignOffset={8} forceMount>
        {published ? (
          <div className="space-y-4">
            <div className="flex gap-2 items-center">
              <Globe className="h-4 w-4 animate-pulse text-blue-500" />
              <p className="text-xs font-medium text-muted-foreground">
                This file has been shared on the web.
              </p>
            </div>
            <div className="flex items-center">
              <input
                className="flex-1 px-2 text-xs border rounded-l-md h-8 bg-muted truncate"
                value={url}
                disabled
              />
              <Button
                onClick={onCopy}
                disabled={!url || copied}
                className="h-8 rounded-l-none bg-neutral-800 dark:bg-neutral-800 text-white"
              >
                {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
              </Button>
            </div>
            <Button
              size="sm"
              className="w-full text-xs bg-red-700 dark:bg-red-700 text-white"
              disabled={isSubmitting}
              onClick={() => handlePublishState(false)}
            >
              Unpublish
            </Button>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center">
            <div className="flex items-center gap-2">
              <Globe className="h-4 w-4 text-muted-foreground mb-2" />
              <p className="text-sm font-medium mb-2">Publish this note</p>
            </div>
            <span className="text-xs text-muted-foreground mb-4">
              Share your work with others.
            </span>
            <Button
              disabled={isSubmitting}
              className="w-full text-xs bg-blue-700 dark:bg-blue-700 text-white"
              size="sm"
              onClick={() => handlePublishState(true)}
            >
              Publish
            </Button>
          </div>
        )}
      </PopoverContent>
    </Popover>
  );
};
