// smithy-typescript generated code
import { Paginator } from "@aws-sdk/types";

import { AppFabricClient } from "../AppFabricClient";
import {
  ListIngestionsCommand,
  ListIngestionsCommandInput,
  ListIngestionsCommandOutput,
} from "../commands/ListIngestionsCommand";
import { AppFabricPaginationConfiguration } from "./Interfaces";

/**
 * @internal
 */
const makePagedClientRequest = async (
  client: AppFabricClient,
  input: ListIngestionsCommandInput,
  ...args: any
): Promise<ListIngestionsCommandOutput> => {
  // @ts-ignore
  return await client.send(new ListIngestionsCommand(input), ...args);
};
/**
 * @public
 */
export async function* paginateListIngestions(
  config: AppFabricPaginationConfiguration,
  input: ListIngestionsCommandInput,
  ...additionalArguments: any
): Paginator<ListIngestionsCommandOutput> {
  // ToDo: replace with actual type instead of typeof input.nextToken
  let token: typeof input.nextToken | undefined = config.startingToken || undefined;
  let hasNext = true;
  let page: ListIngestionsCommandOutput;
  while (hasNext) {
    input.nextToken = token;
    input["maxResults"] = config.pageSize;
    if (config.client instanceof AppFabricClient) {
      page = await makePagedClientRequest(config.client, input, ...additionalArguments);
    } else {
      throw new Error("Invalid client, expected AppFabric | AppFabricClient");
    }
    yield page;
    const prevToken = token;
    token = page.nextToken;
    hasNext = !!(token && (!config.stopOnSameToken || token !== prevToken));
  }
  // @ts-ignore
  return undefined;
}
