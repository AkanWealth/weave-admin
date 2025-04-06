import React, { useEffect, useState } from "react";
import Image from "next/image";
import growthFrame from "@/assets/images/Frame.png";
import Link from "next/link";
import ResourceLibraryProvider, {
  useResourceLibrary,
} from "@/contexts/ResourceLibraryContext";
import exportData from "@/lib/export";
import PaginatedItems from "@/components/elements/Pagination";
import DateRender from "@/components/elements/DateRender";
function ResourcesRender() {
  const [filteredResources, setFilteredResources] = useState([]);
  const [searchKey, setSearchKey] = useState("");
  const { resources, isLoading } = useResourceLibrary();
  const resourceTypes = ["Article", "Video", "Audio"];
  const [resourceFilter, setResourceFilter] = useState("");

  useEffect(() => {
    if (resourceFilter === "") {
      // Sort resources by created_at date in descending order (newest first)
      const sortedResources = [...resources].sort((a, b) => 
        new Date(b.created_at) - new Date(a.created_at)
      );
      return setFilteredResources(sortedResources);
    }

    setSearchKey("");
    const matchResources = resources.filter(
      (resource) =>
        resource.resourceType.toLowerCase() === resourceFilter.toLowerCase()
    ).sort((a, b) => new Date(b.created_at) - new Date(a.created_at)); // Sort filtered resources

    setFilteredResources(matchResources);
  }, [resourceFilter, resources]);

  useEffect(() => {
    // Sort resources by created_at date in descending order (newest first)
    const sortedResources = [...resources].sort((a, b) => 
      new Date(b.created_at) - new Date(a.created_at)
    );
    
    setFilteredResources(sortedResources);
  }, [resources]);

  useEffect(() => {
    if (searchKey === "") return;

    const matchResources = resources.filter((resource) =>
      Object.values(resource)
        .join(" ")
        .toLowerCase()
        .includes(searchKey.toLowerCase())
    ).sort((a, b) => new Date(b.created_at) - new Date(a.created_at)); // Sort search results

    setFilteredResources(matchResources);
  }, [searchKey]);

  const exportContents = () => {
    exportData(
      filteredResources.map((resource) => ({
        title: resource.title,
        tags: resource.tags.join(", ").replace(/,/g, " & "),
        resourceType: resource.resourceType,
        date_created: resource.created_at,
        status: resource.status,
      })),
      ["title", "tags", "resourceType", "date_created", "status"],
      "resources"
    );
  };
  
  const formatDate = (d) => {
    return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
  };
  
  const formatTime = (d) => {
    return `${String(d.getHours()).padStart(2, '0')}:${String(d.getMinutes()).padStart(2, '0')} ${d.getHours() >= 12 ? 'PM' : 'AM'}`; // Fixed AM/PM logic
  };

  return (
    <>
      {/* search pane */}
      <div className="flex my-4">
        <div className="w-3/5">
          <div className="bg-white border px-8 py-2 rounded-md">
            <input
              type="text"
              className="bg-[#f5f6fa] rounded-md w-full px-4 py-2"
              placeholder="Search here"
              value={searchKey}
              onChange={(e) => setSearchKey(e.target.value)}
            />
          </div>
        </div>
        <div className="w-2/5 text-right">
          <button
            className="bg-weave-primary text-base-white p-2 px-4 mr-3 rounded-md font-rubikMedium"
            onClick={exportContents}
          >
            Export
            <i className="fa fa-window-maximize ml-2"></i>
          </button>
          <button className="relative dropdown border p-2 rounded-md font-rubikMedium">
            <span className="px-2">
              {resourceFilter !== "" ? (
                resourceFilter
              ) : (
                <>
                  Filter
                  <i className="fa fa-list ml-2"></i>
                </>
              )}
            </span>
            <div className="absolute right-0 rounded-md p-1 shadow bg-white text-xs w-[200px]  dropdown-menu">
              <div className="flex flex-col text-left">
                <a
                  className={`p-2 capitalize rounded-md mb-1`}
                  onClick={() => setResourceFilter("")}
                >
                  Reset Filter
                </a>
                {resourceTypes.map((typ) => (
                  <a
                    className={`p-2 capitalize rounded-md mb-1 ${
                      resourceFilter === typ ? "bg-gray-200" : ""
                    }`}
                    onClick={() => setResourceFilter(typ)}
                    key={typ}
                  >
                    {typ}
                  </a>
                ))}
              </div>
            </div>
          </button>
        </div>
      </div>

      {/* resources section */}
      <div className="rounded-2xl bg-white p-4 my-4">
        <h3 className="text-xl font-rubikMedium">Resource Library</h3>

        {isLoading ? (
          <>
            {/* Table Rows Placeholder */}
            <div className="space-y-2">
              {[...Array(5)].map((_, index) => (
                <div
                  key={index}
                  className="h-6 bg-gray-200 rounded w-full"
                ></div>
              ))}
            </div>
          </>
        ) : resources && filteredResources.length === 0 ? (
          <div className="flex flex-col text-center justify-center py-12 max-w-[350px] mx-auto">
            <Image
              src={growthFrame}
              className="w-[80px] h-[120px] mx-auto"
              alt="Frame"
            />
            <h4 className="text-xl font-rubikMedium my-2">
              Your Resource Library is Empty
            </h4>
            <p className="text-md my-2">
              There are no resources in your library yet. Once you add articles,
              videos, or audio content, they'll appear here for easy access and
              management.
            </p>
            <div className="">
              <button className="bg-weave-primary py-2 px-6 text-white rounded-md">
                Add New Content
              </button>
            </div>
          </div>
        ) : (
          <PaginatedItems
            items={filteredResources}
            itemsPerPage={10}
            displayType={"table"}
            renderTitle={() => (
              <tr className="bg-[#f5f6fa] ">
                <th className="text-left px-4">Title</th>
                <th className="text-left pl-12">Tags</th>
                <th>Type</th>
                <th>Date Created </th>
                <th>Status</th>
                <th> </th>
              </tr>
            )}
            renderItems={(resource) => (
              <tr key={resource.id}>
                <td className="text-left px-2">
                  <h6 className="font-rubikMedium text-black">
                    {resource.title}
                  </h6>
                </td>
                <td className="text-xs pl-6 text-left">
                  {resource.tags.map((tag) => (
                    <span key={tag} className="tag m-1">
                      {tag}
                    </span>
                  ))}
                </td>
                <td>{resource.resourceType}</td>
                <td>
                <span className="block">{formatDate(new Date(resource.created_at))}</span>
                <span className="block">{formatTime(new Date(resource.created_at))}</span>
                </td>
                <td>
                  <button
                    className={`${
                      resource.status.toLowerCase() === "published"
                        ? "bg-[#28A745] text-base-white"
                        : "bg-[#B5B5B5]"
                    } px-4 rounded-full py-1 text-sm`}
                  >
                    {resource.status}
                  </button>
                </td>
                <td>
                  <button className="relative px-2 py-1 mr-8 dropdown">
                    <div className="dot"></div>
                    <div className="dot"></div>
                    <div className="dot"></div>

                    <div className="absolute right-0 rounded-md p-2 shadow bg-white text-xs w-[200px]  dropdown-menu">
                      <div className="flex flex-col text-left">
                        <Link
                          href={`?modal=edit-resource&resource_id=${resource.id}&contentType=${resource.resourceType}`}
                          className="px-3 py-1"
                        >
                          {" "}
                          <i className="fa fa-pencil mr-2"></i> Edit Content
                        </Link>
                        <Link
                          href={`?modal=delete-resource&resource_id=${resource.id}`}
                          className="text-red-500 px-3 py-1"
                        >
                          {" "}
                          <i className="fa fa-trash mr-2"></i> Delete
                        </Link>
                      </div>
                    </div>
                  </button>
                </td>
              </tr>
            )}
          />
        )}
      </div>
    </>
  );
}

export default function Resources() {
  return (
    <ResourceLibraryProvider>
      <ResourcesRender />
    </ResourceLibraryProvider>
  );
}