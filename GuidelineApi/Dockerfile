FROM mcr.microsoft.com/dotnet/aspnet:7.0 AS base
WORKDIR /app
EXPOSE 80
EXPOSE 443

FROM mcr.microsoft.com/dotnet/sdk:7.0 AS build
WORKDIR /src
COPY ["GuidelineAPI.csproj", "./"]
RUN dotnet restore "GuidelineAPI.csproj"
COPY . .
WORKDIR "/src/"
RUN dotnet build "GuidelineAPI.csproj" -c Release -o /app/build

FROM build AS publish
RUN dotnet publish "GuidelineAPI.csproj" -c Release -o /app/publish

FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "GuidelineAPI.dll"]
