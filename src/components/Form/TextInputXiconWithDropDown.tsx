import {
  ChangeEvent, FocusEvent, InputHTMLAttributes, useEffect, useRef, useState,
} from 'react';
import { FieldValues, UseFormSetValue, useFormContext } from 'react-hook-form';
import { IconType } from 'react-icons';
import { IoMdAlert, IoMdClose } from 'react-icons/io';
import { FaSpinner } from 'react-icons/fa';
import { GrAddCircle } from 'react-icons/gr';

export interface HasIdandName {
  id: number,
  name: string,
}

interface TextInputXiconWithDropDownProps<
  T extends HasIdandName,
> extends InputHTMLAttributes<HTMLTextAreaElement> {
  iconleft: IconType,
  iconright?: IconType,
  iconRightSelected?: IconType, // Exibe um ícone antes do ícone de cancelar seleção
  title?: string,
  name: string,
  fieldNameType: string,
  mask?: (value: string) => string
  iconClick?: (value: string) => void
  iconRightSelectedClick?: () => void
  isLoading?: boolean,
  canChangeSelection?: boolean, // Indica se o ícone de cancelar seleção é exibido
  items?: Array<T>;
  onItemSelect: (item: T, setValue: UseFormSetValue<FieldValues>) => void;
  defaultSelectedItem?: T | null;
  heightControl?: unknown;
  blankItemOnDeselect?: boolean;
}

export default function TextInputXiconWithDropDown<T extends HasIdandName>({
  name,
  fieldNameType,
  title = '',
  iconleft: IconLeft,
  iconright: IconRight = undefined,
  iconRightSelected: IconRightSelected = undefined,
  iconClick,
  iconRightSelectedClick,
  items = [],
  isLoading = false,
  canChangeSelection = true,
  placeholder,
  mask = (value: string) => value,
  onItemSelect,
  defaultSelectedItem,
  heightControl,
  blankItemOnDeselect = false,
  disabled,
  ...props
}: TextInputXiconWithDropDownProps<T>) {
  const {
    register,
    setValue,
    formState: { errors },
  } = useFormContext();

  const [showDropdown, setShowDropdown] = useState<boolean>(false);
  const [selectedItem, setSelectedItem] = useState<T | null>(defaultSelectedItem || null);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const blankItem = { id: -1, name: '' } as T;

  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const adjustTextareaHeight = () => {
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = 'auto';
      textarea.style.height = `${textarea.scrollHeight}px`;
    }
  };

  useEffect(() => {
    adjustTextareaHeight();
  }, [searchTerm, selectedItem, heightControl]);

  useEffect(() => {
    setSelectedItem(defaultSelectedItem || null);
  }, [defaultSelectedItem]);

  useEffect(() => {
    adjustTextareaHeight();
    if (defaultSelectedItem) {
      onItemSelect(defaultSelectedItem, setValue);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const filteredItems = items?.filter(
    (item) => item.name.toLowerCase()?.includes(searchTerm.toLowerCase()),
  );

  const handleSelectItem = (item: T | null) => {
    if (item === null) {
      if (iconClick) iconClick(searchTerm);
      return;
    }

    setSelectedItem(item);
    onItemSelect(item, setValue);
    setShowDropdown(false);
    setSearchTerm('');

    errors[name] = undefined;
  };

  const handleEnterPressed = () => {
    if (searchTerm.length > 0 && filteredItems?.length === 0 && iconClick) iconClick(searchTerm);
  };

  const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    if (mask) { setSearchTerm(mask(e.target.value)); if (!showDropdown) setShowDropdown(true); }
  };

  const handleLostCapture = (e: FocusEvent<HTMLTextAreaElement, Element>) => {
    if (props.onBlur) props.onBlur(e);
    setTimeout(() => setShowDropdown(false), 200);
  };

  const handleDeselectClient = () => {
    if (blankItemOnDeselect) {
      setSelectedItem(null);
      onItemSelect(blankItem, setValue);
      setShowDropdown(false);
      setSearchTerm('');
      return;
    }
    setSelectedItem(null);
    setValue(name, null);
  };

  return (
    <div className="w-full min-h-15">
      <label htmlFor={name} className="block text-left text-sm font-medium text-gray-900 mb-1">
        {title}
      </label>
      <div className={`flex relative ${disabled && 'opacity-60'}`}>
        <div className="w-full flex">
          <div className="absolute inset-y-0 left-0 flex items-center pl-3.5 pointer-events-none">
            <IconLeft className="h-5 w-5 text-gray-400" />
          </div>
          <textarea
            autoComplete="off"
            onFocus={() => { if (!selectedItem) setShowDropdown(true); }}
            onKeyDown={(e) => {
              if (e.key === 'Enter') handleEnterPressed();
              else if (e.key === 'Escape') setShowDropdown(false);
            }}
            placeholder={placeholder}
            value={selectedItem ? selectedItem.name : searchTerm}
            {...props}
            {...register(name, {
              onChange: handleChange,
              onBlur: handleLostCapture,
            })}
            ref={textareaRef}
            id={name}
            disabled={!!selectedItem}
            className={`outline-0 border ${selectedItem ? 'border-blue-400' : 'border-gray-300'}
             text-gray-900 text-sm rounded-lg min-h-10 focus:ring-blue-500 focus:border-blue-500 bg-gray-50 block w-full pl-10 pr-8 py-2.5 overflow-hidden ${disabled && 'cursor-not-allowed'}`}
            rows={1}
          />
          {selectedItem ? (
            <>
              {IconRightSelected && (
                <button
                  type="button"
                  aria-label="Editar Seleção"
                  onClick={iconRightSelectedClick}
                  className={`${canChangeSelection ? 'right-10' : 'right-0'} absolute inset-y-0 flex items-center pr-2.5`}
                >
                  <IconRightSelected className="w-5.5 h-5 hover:text-blue-600" />
                </button>
              )}
              {canChangeSelection && (
                <button
                  type="button"
                  aria-label="Cancelar seleção"
                  onClick={handleDeselectClient}
                  className="absolute inset-y-0 right-0 flex items-center pr-2.5"
                  disabled={disabled}
                >
                  <IoMdClose className="w-5.5 h-5.5 text-red-500" />
                </button>
              )}
            </>
          ) : (
            IconRight && (
              <button
                type="button"
                aria-label="Adicionar novo"
                onClick={() => { if (iconClick) iconClick(searchTerm); }}
                className="absolute inset-y-0 right-0 flex items-center pr-3.5"
              >
                <IconRight className="h-6 w-5 text-gray-900 duration-300 ease-in-out hover:text-blue-600" />
              </button>
            )
          )}
        </div>
        {showDropdown && (
          <div
            className="absolute z-10 mt-2 w-full bg-white border border-gray-200 rounded shadow-lg top-full max-h-60 overflow-auto"
          >
            {(filteredItems?.length === 0 || searchTerm.length === 0)
              && (IconRight !== undefined) && (
                <>
                  <button
                    type="button"
                    onMouseDown={() => {
                      if (iconClick) iconClick(searchTerm); setShowDropdown(false);
                    }}
                    className="flex w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 items-center"
                  >
                    <div className="flex items-center">
                      <GrAddCircle className="mr-2" />
                      <p>
                        Cadastrar
                        {' '}
                        {fieldNameType}
                      </p>
                    </div>
                  </button>
                  {searchTerm?.length === 0 && (
                    <hr className="" />
                  )}
                </>
            )}

            {isLoading ? (
              <div className="flex justify-center items-center py-2">
                <FaSpinner className="animate-spin" />
                {' '}
              </div>
            ) : (
              filteredItems?.map((item) => (
                <button
                  key={item.id}
                  type="button"
                  onMouseDown={() => handleSelectItem(item)}
                  className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                >
                  {item.name}
                </button>
              ))
            )}
            {filteredItems && filteredItems.length > 0 && searchTerm.length > 0 && (IconRight) && (
              <>
                {searchTerm?.length > 0 && (
                  <hr className="my-2" />
                )}
                <button
                  type="button"
                  onMouseDown={() => handleSelectItem(null)}
                  className="flex w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 items-center"
                >
                  <div className="flex items-center">
                    <GrAddCircle className="mr-2" />
                    <p>
                      Novo
                      {' '}
                      {fieldNameType}
                    </p>
                  </div>

                </button>
              </>
            )}
          </div>
        )}
      </div>
      <span className="flex text-red-500 text-left text-sm">
        {errors[name] ? (
          <div className="flex items-center gap-x-1">
            <IoMdAlert />
            {' '}
            <p>
              Selecione um
              {' '}
              {fieldNameType}
              !
            </p>
          </div>
        ) : ''}
      </span>
    </div>
  );
}
