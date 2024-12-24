import "@testing-library/jest-dom";
import { cleanup } from "@testing-library/react";
import { afterEach, beforeEach, vi } from "vitest";

beforeEach(() => {
  vi.resetAllMocks();
});

afterEach(() => {
  cleanup();
});
