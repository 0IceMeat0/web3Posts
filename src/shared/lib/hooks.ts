"use client";

import { useDispatch, useSelector } from "react-redux";
import type { RootState, AppDispatch } from "./store";

/** Typed `useDispatch` bound to AppDispatch  */
export const useAppDispatch = useDispatch.withTypes<AppDispatch>();

/** Typed `useSelector` bound to RootState */
export const useAppSelector = useSelector.withTypes<RootState>();
