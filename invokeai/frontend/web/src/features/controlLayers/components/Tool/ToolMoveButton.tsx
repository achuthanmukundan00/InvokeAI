import { IconButton } from '@invoke-ai/ui-library';
import { useAppDispatch, useAppSelector } from 'app/store/storeHooks';
import { toolChanged } from 'features/controlLayers/store/canvasV2Slice';
import { memo, useCallback } from 'react';
import { useHotkeys } from 'react-hotkeys-hook';
import { useTranslation } from 'react-i18next';
import { PiCursorBold } from 'react-icons/pi';

export const ToolMoveButton = memo(() => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const isSelected = useAppSelector((s) => s.canvasV2.tool.selected === 'move');
  const isDisabled = useAppSelector(
    (s) => s.canvasV2.selectedEntityIdentifier === null || s.canvasV2.session.isStaging || s.canvasV2.tool.isTransforming
  );

  const onClick = useCallback(() => {
    dispatch(toolChanged('move'));
  }, [dispatch]);

  useHotkeys('v', onClick, { enabled: !isDisabled }, [isDisabled, onClick]);

  return (
    <IconButton
      aria-label={`${t('controlLayers.tool.move')} (V)`}
      tooltip={`${t('controlLayers.tool.move')} (V)`}
      icon={<PiCursorBold />}
      colorScheme={isSelected ? 'invokeBlue' : 'base'}
      variant="outline"
      onClick={onClick}
      isDisabled={isDisabled}
    />
  );
});

ToolMoveButton.displayName = 'ToolMoveButton';